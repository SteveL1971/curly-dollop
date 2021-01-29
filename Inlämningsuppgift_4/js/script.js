function Member(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.fullName = function () { return this.firstName + " " + this.lastName; };
}

// instansiering

var members = [
    new Member('1', 'Steve', 'Lyne', 'stevelyne1971@gmail.com'),
    new Member('2', 'Jevgenia', 'Kim', 'kimjevgenia@gmail.com'),
    new Member('3', 'Jim-Bob', 'Thornton', 'jimbob.thornton@abc.com'),
    new Member('4', 'Anne', 'Hathaway', 'anne@cnn.com'),
    new Member('5', 'Peter', 'Perrin', 'peter.perrin@bbc.co.uk'),
    new Member('6', 'Donald', 'Trump', 'im.retarded@usa.com'),
    new Member('7', 'Stefano', 'Lynell', 'stefanolynell@gmail.com'),
    new Member('8', 'Jev', 'Kimchi', 'kimchijev@gmail.com'),
    new Member('9', 'Jim-Bobby Dick', 'Tornby', 'jimbobbyD.thornton@abc.com'),
    new Member('10', 'Anne', 'Castaway', 'annieC@cnn.com'),
    new Member('11', 'Peter', 'Sterrin', 'peter.sterrin@bbc.co.uk'),
    new Member('12', 'Donald G', 'Trump', 'im.veryretarded@usa.com')
]

const output = document.querySelector('#formList');
const accountList = document.querySelector('#accountList');
const submit = document.querySelector('#submit');
const avbryt = document.querySelector('#avbryt');
const update = document.querySelector('#update');
const remove = document.querySelector('#remove');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const memberList = document.querySelector('#memberList');
const faultList = document.querySelector('#faultList');
const faultForm = document.querySelector('#faultForm');
const makeAccount = document.querySelector('#makeAccount');
const changeAccount = document.querySelector('#changeAccount');
const removeAccount = document.querySelector('#removeAccount');
const buttonRow = document.querySelector('#buttonRow');
const formShell = document.querySelector('#formShell');
const formInput = document.querySelector('#formInput');
const memberInput = document.querySelector('#memberInput');
const header = document.querySelector('#header');
const accountNumber = document.querySelector('#accountNumber');

const listMembers = () => {
    output.innerHTML = ''
    memberList.innerHTML = ''
    accountList.innerHTML = ''
    faultList.innerHTML = ''

    members.forEach(member => {
        output.innerHTML += `<div id="${member.id}" class="bg-white border rounded row pt-1 mt-1 mb-1 d-flex justify-content-between align-items-center col-12"><div class="col-9 rounded p-1" style="padding: 0px;"><h6 class="rounded mb-2">${member.id}</h6><h5 class="rounded">${member.fullName()}</h5><h6 class="rounded">${member.email}</h6></div><button class="col-3 w-100 pt-2 pl-0 pr-0 pb-2 invisible but-vis change-btn btn btn-danger align-items-center" style="border: 9px solid; border-radius: 15px;">Ta bort</button></div>`
        accountList.innerHTML += `<div id="${member.id}" class="bg-white border rounded row pt-1 mt-1 mb-1 d-flex justify-content-between align-items-center col-12 col-md-6"><div class="col-12 rounded p-1" style="padding: 0px;"><h5 class="rounded">${member.fullName()}</h5><h6 class="rounded">${member.email}</h6></div></div>`
        memberList.innerHTML += `<div id="m${member.id}" class="bg-white border rounded row p-0 mt-1 mb-1 d-flex justify-content-between align-items-center" style="padding-right:0px; padding-left: 0px;"><div class="rounded row col-9 p-1 d-flex justify-content-between align-items-center"><h6 class="rounded w-100 ml-1">${member.id}</h6><h6 class="rounded w-100 ml-1">${member.firstName} ${member.lastName}</h6><h6 class="rounded w-100 ml-1">${member.email}</h6></div><button class="col-3 w-100 pt-2 pb-2 visible change-btn but2-vis btn btn-cyan align-items-center" style="border: 9px solid; border-radius: 15px;">Ändra</button>`
    })
}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    faultList.innerHTML = ''
    let errorCatch = 0
    errorCatch += firstNameCheck()
    errorCatch += lastNameCheck()
    errorCatch += checkEmail()
    ValidateFörnamn(firstName.value)
    ValidateEfternamn(lastName.value)

    if (emailCompareNew()) {
        console.log("can't add this")
        errorCatch += 1;
    } else {
        console.log("skapa false")
    }

    if (errorCatch == 0) {
        const member = new Member(Date.now().toString(), firstName.value, lastName.value, email.value)
        members.push(member)
        listMembers()
        firstNameReset()
        lastNameReset()
        emailReset()
        faultForm.classList.add('ghost');
    } else {
        faultForm.classList.remove('ghost');
    }
})

avbryt.addEventListener('click', (e) => {
    e.preventDefault()
    id.value = "";
    firstNameReset()
    lastNameReset()
    emailReset()

    submit.classList.add('ghost');
    faultForm.classList.add('ghost');
    avbryt.classList.add('ghost');
    update.classList.add('ghost');
    formInput.classList.add('ghost');
    memberInput.classList.add('ghost');
})

update.addEventListener('click', (e) => {
    e.preventDefault()
    faultList.innerHTML = ''

    let errorCatch = 0
    errorCatch += firstNameCheck()
    errorCatch += lastNameCheck()
    errorCatch += checkEmail()

    if (emailCompareUpdate()) {
        console.log("can't add this")
        errorCatch += 1;
        faultForm.classList.remove('ghost');
    } else {
        faultForm.classList.add('ghost');
    }

    if (errorCatch == 0) {

        var idPosition = members.findIndex(function (value) {
            return value.id == id.value;
        });
        console.log("yes " + idPosition);

        if (idPosition > -1) {
            members[idPosition].firstName = firstName.value,
                members[idPosition].lastName = lastName.value,
                members[idPosition].email = email.value
            listMembers()
            firstNameReset()
            lastNameReset()
            emailReset()
            avbryt.classList.add('ghost');
            update.classList.add('ghost');
            formInput.classList.add('ghost');
            memberInput.classList.add('ghost');
        }
    } else {
        faultForm.classList.remove('ghost');
    }

})


memberList.addEventListener('click', (e) => {
    if (e.target.className.indexOf(' visible') > -1) {
    
        firstNameReset()
        lastNameReset()
        emailReset()
        var idPosition = members.findIndex(function (value) {
            return "m" + value.id == e.target.parentNode.id;
        });

        if (idPosition >= 0) {
            id.value = members[idPosition].id
            firstName.value = members[idPosition].firstName
            lastName.value = members[idPosition].lastName
            email.value = members[idPosition].email
        }

        submit.classList.add('ghost');
        avbryt.classList.remove('ghost');
        update.classList.remove('ghost');
        formInput.classList.remove('ghost');
        memberInput.classList.remove('ghost');
        listMembers();
    }

})


formList.addEventListener('click', (e) => {

    if (e.target.className.indexOf(' visible') > -1) {
        members = members.filter(member => member.id !== e.target.parentNode.id)
        listMembers();
        var buttons = document.getElementsByClassName('but-vis');
        if (buttons[0].className.indexOf(' visible') == -1) {

            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.add('visible');
                buttons[i].classList.remove('invisible');
                console.log(buttons[i].className);
            }
        }
    }
})

makeAccount.addEventListener('click', (e) => {
    makeAccount.classList.add('active');
    avbryt.classList.add('ghost');
    update.classList.add('ghost');
    changeAccount.classList.remove('active');
    removeAccount.classList.remove('active');
    accountNumber.classList.add('ghost');
    formInput.classList.remove('ghost');
    memberInput.classList.remove('ghost');
    faultList.classList.remove('ghost');
    submit.classList.remove('ghost');
    memberList.classList.add('ghost');
    accountList.classList.remove('ghost');
    remove.classList.add('ghost');
    formShell.classList.add('ghost');
    faultForm.classList.add('ghost');

    header.innerHTML = "<h4>Skapa konto</h4>";
    var buttons = document.getElementsByClassName('but-vis');
    if (buttons[0].className.indexOf(' invisible') == -1) {

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('visible');
            buttons[i].classList.add('invisible');
            console.log(buttons[i].className);
        }
    }
})

changeAccount.addEventListener('click', (e) => {
    makeAccount.classList.remove('active');
    changeAccount.classList.add('active');
    removeAccount.classList.remove('active');
    accountNumber.classList.remove('ghost');
    formInput.classList.add('ghost');
    memberInput.classList.add('ghost');
    memberList.classList.remove('ghost');
    accountList.classList.add('ghost');
    formList.classList.add('ghost');
    submit.classList.add('ghost');
    avbryt.classList.add('ghost');
    update.classList.add('ghost');
    remove.classList.add('ghost');
    formShell.classList.add('ghost');
    faultForm.classList.add('ghost');
    header.innerHTML = "<h4>Ändra ett konto</h4>";
})

removeAccount.addEventListener('click', (e) => {
    makeAccount.classList.remove('active');
    changeAccount.classList.remove('active');
    removeAccount.classList.add('active');
    avbryt.classList.add('ghost');
    update.classList.add('ghost');
    formInput.classList.add('ghost');
    memberInput.classList.add('ghost');
    submit.classList.add('ghost');
    memberList.classList.add('ghost');
    accountList.classList.add('ghost');
    remove.classList.remove('ghost');
    formShell.classList.remove('ghost');
    faultList.classList.add('ghost');
    faultForm.classList.add('ghost');
    header.innerHTML = "<h4>Ta bort ett konto</h4>";

    var buttons = document.getElementsByClassName('but-vis');

    if (buttons[0].className.indexOf(' visible') == -1) {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.add('visible');
            buttons[i].classList.remove('invisible');
            console.log(buttons[i].className);
        }
    }
})

remove.addEventListener('click', (e) => {
    e.preventDefault()
    var buttons = document.getElementsByClassName('but-vis');
    if (buttons[0].className.indexOf(' visible') == -1) {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.add('visible');
            buttons[i].classList.remove('invisible');
            console.log(buttons[i].className);
        }
    } else {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('visible');
            buttons[i].classList.add('invisible');
            console.log(buttons[i].className);
        }
    }
})

function ValidateEmail(email) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
        console.log("email check true")
        return true;
    }
    else {
        if (email.length > 0) {
            faultList.innerHTML += "Emailadressen är felaktig!<br>";
        } else {
            faultList.innerHTML += "Email-fältet får inte lämnas tomt!<br>";
        }
        faultList.classList.remove('ghost');
        faultForm.classList.remove('ghost');
        console.log("email check false")
        return false;
    }
}

function ValidateFörnamn(namn) {
    var letters = /^[a-zA-ZÄäÖöÅåÉé -]+$/;

    if (namn.match(letters)) {
        return false;
    }
    else {
        if (namn.length > 0) {
            firstName.classList.remove('is-valid');
            firstName.classList.add('is-invalid');
            faultList.innerHTML += "Obs! Förnamnet innehåller ogiltiga tecken<br>";
            console.log("Förnamn innehåller ogiltiga tecken");
            return true;
        } else {
            faultList.innerHTML += "Förnamn-fältet får inte lämnas tomt<br>";
        }
    }
}
function ValidateEfternamn(namn) {
    var letters = /^[a-zA-ZÄäÖöÅåÉé -]+$/;

    if (namn.match(letters)) {
        return false;
    }
    else {
        if (namn.length > 0) {
            lastName.classList.remove('is-valid');
            lastName.classList.add('is-invalid');
            faultList.innerHTML += "Obs! Efternamnet innehåller ogiltiga tecken<br>";
            console.log("Efternamnet innehåller ogiltiga tecken");
            return true;
        } else {
            faultList.innerHTML += "Efternamn-fältet får inte lämnas tomt<br>";
        }
    }
}

function emailCompare() {
    let found = false;
    members.forEach((member, index) => {
        if (email.value == member.email) {
            if (id.value != member.id) {
                console.log(email.value + " + " + member.email)
                console.log(id.value + " + " + member.id)
                found = true;

            }
        }
    });
    return found;
}

function emailCompareUpdate() {
    let found = false;
    members.forEach((member, index) => {
        if (email.value == member.email) {
            if (id.value != member.id) {
                console.log(email.value + " + " + member.email)
                console.log(id.value + " + " + member.id)
                found = true;
                email.classList.add('is-invalid');
                faultList.innerHTML += "Obs!! Emailadressen är redan kopplad till ett befintligt konto! Den måste vara unik!<br>";
            }
        }
    });
    return found;

}

function emailCompareNew() {
    let found = false;
    members.forEach((member, index) => {
        if (email.value == member.email) {
            console.log(email.value + " + " + member.email)
            found = true;
            email.classList.add('is-invalid');
            faultList.innerHTML += "Obs! Emailadressen är redan kopplad till ett befintligt konto! Den måste vara unik!<br>";
        }
    });
    return found;
}

const checkEmail = () => {
    let errorCatch = 0
    if (email.value !== '') {
        email.classList.remove('is-invalid');
        let at = email.value.indexOf('@');
        let dot = email.value.indexOf('.', at + 2);
        if (!ValidateEmail(email.value)) errorCatch += 1
        if (dot == -1 || at == -1 || email.value.length == 2) errorCatch += 1;
    } else {
        errorCatch += 1;
    }

    if (errorCatch > 0) {
        email.classList.add('is-invalid');
    } else {
        email.classList.add('is-valid');
    }

    return errorCatch;
}

const firstNameCheck = () => {
    if (firstName.value !== '') {
        if (ValidateFörnamn(firstName.value) == false) {
            return 0;
        } else {
            return 1;
        }
    } else {
        firstName.classList.add('is-invalid');
        return 1;
    }
}

const lastNameCheck = () => {
    if (lastName.value !== '') {
        if (ValidateEfternamn(lastName.value) == false) {
            return 0;
        } else {
            return 1;
        }
    } else {
        lastName.classList.add('is-invalid');
        return 1;
    }
}

const firstNameReset = () => {
    firstName.value = '';
    firstName.classList.remove('is-valid');
    firstName.classList.remove('is-invalid');
}

const lastNameReset = () => {
    lastName.value = '';
    lastName.classList.remove('is-valid');
    lastName.classList.remove('is-invalid');
}

const emailReset = () => {
    email.value = '';
    email.classList.remove('is-valid');
    email.classList.remove('is-invalid');
}

function nameFix(name, index, array) {
    name += "mm" + name
    console.log(index + " " + name);
}

firstName.addEventListener('focusout', () => {
    faultForm.classList.add('ghost');
    faultList.innerHTML = ''

    if (firstName.value !== '') {
        if (ValidateFörnamn(firstName.value) == false) {
            firstName.classList.add('is-valid');
            firstName.classList.remove('is-invalid');

            const names = firstName.value.split(' ');
            names.forEach((name, index) => names[index] = `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`);
            firstName.value = ""
            names.forEach((name, index) => firstName.value += `${name} `);
            firstName.value = firstName.value.trim()
            console.log(firstName.value)

            const names2 = firstName.value.split('-');
            names2.forEach((name, index) => names2[index] = `${name.charAt(0).toUpperCase()}${name.slice(1)}`);
            firstName.value = ""
            names2.forEach((name, index) => firstName.value += `${name}-`);
            firstName.value = firstName.value.slice(0, firstName.value.length - 1)
            console.log(firstName.value)
        }
    } else {
        firstName.classList.remove('is-valid');
        firstName.classList.remove('is-invalid');
    }
})

function matchExpression(str) {
    var rgularExp = {
        containsNumber: /\d+/,
    }

    var expMatch = {};
    expMatch.containsNumber = rgularExp.containsNumber.test(str);
    return expMatch;
}

lastName.addEventListener('focusout', () => {
    faultForm.classList.add('ghost');
    faultList.innerHTML = ''

    if (lastName.value !== '') {
        if (ValidateEfternamn(lastName.value) == false) {
            lastName.classList.add('is-valid');
            lastName.classList.remove('is-invalid');
            lastName.value = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1);

            console.log("Only Numbers:\n ", matchExpression(lastName.value));

            const names = lastName.value.split(' ');
            names.forEach((name, index) => names[index] = `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`);
            lastName.value = ""
            names.forEach((name, index) => lastName.value += `${name} `);
            lastName.value = lastName.value.trim()
            console.log(lastName.value)

            const names2 = lastName.value.split('-');
            names2.forEach((name, index) => names2[index] = `${name.charAt(0).toUpperCase()}${name.slice(1)}`);
            lastName.value = ""
            names2.forEach((name, index) => lastName.value += `${name}-`);
            lastName.value = lastName.value.slice(0, lastName.value.length - 1)
            console.log(lastName.value)
        }
    } else {
        lastName.classList.remove('is-valid');
        lastName.classList.remove('is-invalid');
    }
})

email.addEventListener('focusout', () => {
    faultForm.classList.add('ghost');
    faultList.innerHTML = ''

    if (email.value !== '') {
        checkEmail()
    } else {
        email.classList.remove('is-valid');
        email.classList.remove('is-invalid');
    }
})

listMembers();
