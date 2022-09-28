// input validation
function checkvalidation() {

    var aUserList = []
    var oUserData = {}

    // Input get
    var userPassword = document.getElementById('userPassword').value
    var userName = document.getElementById('userName').value
    var userEmail = document.getElementById('userEmail').value
    var userNumber = document.getElementById('userNumber').value
    var userBirthdate = document.getElementById('userBirthdate').value

    //Regular Expressions
    var regexPassword = new RegExp(/^[a-zA-Z]\w{3,14}$/)
    var regexName = new RegExp(/^[a-zA-Z ]{2,30}$/);
    var regexEmail = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
    var regexNumber = new RegExp(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)

    if (regexName.test(userName) && regexEmail.test(userEmail) && regexNumber.test(userNumber) && regexPassword.test(userPassword)) {

        oUserData.userName = userName
        oUserData.userEmail = userEmail
        oUserData.userNumber = userNumber
        oUserData.userBirthdate = userBirthdate
        oUserData.userPassword = userPassword

        if (document.getElementById('userGenderMale').checked) {
            oUserData.userGender = 'Male'
        }
        else if (document.getElementById('userGenderFemale').checked) {
            oUserData.userGender = 'Female'
        }
        else if (document.getElementById('userGenderOther').checked) {
            oUserData.userGender = 'Other'
        }

        aUserList.push(oUserData)
        localStorage.setItem('userData', JSON.stringify(oUserData))


        sessionStorage.setItem("sessionUser", true);

        window.location = "./dashboard.html"


        return false
    }

    else {
        alert('invalid data')
    }

}

function checkSession(){
    if (!sessionStorage.getItem("sessionUser")) {
        window.location = "./index.html"
    }
}

function password() {

    if (sessionStorage.getItem("sessionUser")) {

        let oUserData = JSON.parse(localStorage.getItem('userData'))

        var userCurrentPassword = document.getElementById('userCurrentPassword').value
        var userNewPassword = document.getElementById('userNewPassword').value

        if (oUserData.userPassword === userCurrentPassword) {
            oUserData.userPassword = userNewPassword
            alert('Password changed')

            document.getElementById('myForm').reset()

            console.log(oUserData)

            localStorage.setItem('userData', JSON.stringify(oUserData))

            return false
        }
        else {
            alert('current password is wrong')
            return false
        }
    }
    else {
        
        window.location = "./index.html"
    }

}


function updateOnLoad() {
    if (sessionStorage.getItem("sessionUser")) {


        let oUserData = JSON.parse(localStorage.getItem('userData'))

        document.getElementById('userName').value = oUserData.userName
        document.getElementById('userEmail').value = oUserData.userEmail
        document.getElementById('userNumber').value = oUserData.userNumber
        document.getElementById('userBirthdate').value = oUserData.userBirthdate

        if (oUserData.userGender === "Male") {
            document.getElementById('userGenderMale').checked = true
        }
        else if (oUserData.userGender === "Female") {
            document.getElementById('userGenderFemale').checked = true
        }
        else if (oUserData.userGender === "Other") {
            document.getElementById('userGenderOther').checked = true
        }

    }
    else {
        
        window.location = "./index.html"
    }
}

function update() {

    if (sessionStorage.getItem("sessionUser")) {

        let oUserData = JSON.parse(localStorage.getItem('userData'))

        // Input get
        var userName = document.getElementById('userName').value
        var userEmail = document.getElementById('userEmail').value
        var userNumber = document.getElementById('userNumber').value
        var userBirthdate = document.getElementById('userBirthdate').value

        //Regular Expressions
        var regexName = new RegExp(/^[a-zA-Z ]{2,30}$/);
        var regexEmail = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
        var regexNumber = new RegExp(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)

        if (regexName.test(userName) && regexEmail.test(userEmail) && regexNumber.test(userNumber)) {

            oUserData.userName = userName
            oUserData.userEmail = userEmail
            oUserData.userNumber = userNumber
            oUserData.userBirthdate = userBirthdate
            oUserData

            if (document.getElementById('userGenderMale').checked) {
                oUserData.userGender = 'Male'
            }
            else if (document.getElementById('userGenderFemale').checked) {
                oUserData.userGender = 'Female'
            }
            else if (document.getElementById('userGenderOther').checked) {
                oUserData.userGender = 'Other'
            }

            localStorage.setItem('userData', JSON.stringify(oUserData))

            window.location = "./dashboard.html"

            return false
        }
        else {
            console.log(oUserData)
            alert('Oops there is some invalid data or empty data in form')
            return false;
        }
    }
    else {
        
        window.location = "./index.html"
    }

}

function login() {
    let oUserData = JSON.parse(localStorage.getItem('userData'))

    let userEmail = document.getElementById('userEmail').value
    let userPassword = document.getElementById('userPassword').value

    if (userEmail === oUserData.userEmail && userPassword === oUserData.userPassword) {
        sessionStorage.setItem("sessionUser", true);
        window.location = "./dashboard.html"
    }
    else {
        alert("Invalid User")
    }

    return false
}


function clearSession() {
    sessionStorage.removeItem('sessionUser');
    window.location = "./login.html"
    
}