const form = document.querySelector('#todoForm');
const edit = document.querySelector('#edit');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');

let todos = [];

const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos/?_limit=10')
    .then(res => res.json())
    .then(data => {
      todos = data;
      console.log(todos);
      listTodos();
    })
}
fetchTodos();

const newTodo = (todo) => {

  let card = document.createElement('div');
  card.classList.add('card', 'p-3', 'my-3', 'todo');

  let innerCard = document.createElement('div');
  if (todo.completed) {
    innerCard.classList.add('d-flex', 'justify-content-between', 'todo-done', 'align-items-center');
  } else {
    innerCard.classList.add('d-flex', 'justify-content-between', 'todo-incomplete', 'align-items-center');
  }

  let title = document.createElement('h3');
  title.classList.add('title');
  title.innerText = todo.id + ": " + todo.title;
  title.addEventListener('click', () => {
    if (!todo.completed) {
      let titleDiv = document.createElement('div');
      titleDiv.classList.add('input-group', 'col', 'py-3', 'my-0');
      let titleInput = document.createElement('input');
      titleInput.type = "text";
      titleInput.id = "todoInput";
      titleInput.value = todo.title;
      titleInput.classList.add('form-control', 'py-2');
      let addButton = document.createElement('button');
      addButton.classList.add('btn', 'btn-dark', 'rounded');
      addButton.innerText = 'Update';

      addButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!todo.completed) {
          todo.title = titleInput.value;
          edit.classList.add('display-none');
          form.classList.remove('display-none');
          todoInputError.innerText = '';
          input.classList.remove('is-invalid');
          listTodos();
        }
      });

      todoInputError.innerText = ''
      titleDiv.appendChild(titleInput)
      titleDiv.appendChild(addButton)
      edit.innerHTML = ''
      edit.appendChild(titleDiv)
      edit.classList.remove('display-none');
      form.classList.add('display-none');
    }
  });


  let innerDiv = document.createElement('div');
  innerDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center');

  let button = document.createElement('button');
  if (todo.completed) {
    button.classList.add('btn', 'w-2', 'btn-danger');
  } else {
    button.classList.add('btn', 'w-2', 'btn-danger', 'display-none');
  }

  button.innerText = 'X';
  button.addEventListener('click', () => {
    todos = todos.filter(todo => todo.id !== todos.id)
    for (i = 0; i < todos.length; i++) {
      if (todos[i].id == todo.id) {
        delete todos[i];
      }
    }
    listTodos();
  });

  let done_button = document.createElement('button');
  if (todo.completed) {
    done_button.classList.add('btn', 'w-2', 'btn-success', 'display-none');
  } else {
    done_button.classList.add('btn', 'w-2', 'btn-success');
  }
  done_button.innerText = 'OK';
  done_button.addEventListener('click', () => {
    todo.completed = true;
    listTodos();
  });

  let back_button = document.createElement('button');
  if (todo.completed) {
    back_button.classList.add('btn', 'w-2', 'btn-info');
  } else {
    back_button.classList.add('btn', 'w-2', 'btn-info', 'display-none');
  }
  back_button.innerText = '...';
  back_button.addEventListener('click', () => {
    todo.completed = false;
    listTodos();
  });

  innerCard.appendChild(title);
  innerCard.appendChild(innerDiv);
  innerDiv.appendChild(back_button);
  innerDiv.appendChild(done_button);
  innerDiv.appendChild(button);
  card.appendChild(innerCard);
  output.appendChild(card);
}


const listTodos = () => {
  output.innerHTML = '';
  todos.forEach(todo => {
    newTodo(todo);
  })
}

const createTodo = (title) => {

  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.id = Date.now()
      todos.unshift(data);
      listTodos();
    })
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value == "") {
    input.classList.add('is-invalid');
    todoInputError.innerText = 'Obs! Fältet kan inte lämnas tomt!';
    console.log("ddd")
  } else {
    input.classList.remove('is-invalid');
    todoInputError.innerText = '';
    createTodo(input.value);
  }
  input.value = '';
})