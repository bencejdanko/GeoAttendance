const query = require('./query')
const schema = require('./schema')
const api = require('./api')

api.Initialize_Schema_With_Dummy_Data()
api.Start_Server()

function GetStatus() {
    const response = fetch('/', {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
    })
    return response
}

function PostRegisterNewUser(firstName, lastName, userName, email, password, confirmPassword) {
    const response = fetch('/signup', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, userName, email, password, confirmPassword })
    })
    return response
}

const tests = [
    TestGetStatus = async () => {

        /**
         * Test a valid get request
         */
        res = PostGetStatus()
        const data = await response.json()
        ValidGetStatus = response.ok
        return [ "ValidGet: " + ValidGetStatus ]
    },

    TestRegisterNewUser = async () => {
        firstName = "John"
        lastName = "Doe"
        userName = "JD123"
        email = "example@example.com"
        password = "password"
        confirmPassword = "password"

        /**
         * Test a valid signup form
         */
        const response = await fetch('/signup', {
           method: 'POST',
           headers: {
                'Content-Type': 'application/json'
           },
           body: JSON.stringify({ firstName, lastName, userName, email, password, confirmPassword })
        })

        validSignup = response.ok

        /**
         * Test a missing firstName
         */
        response = await fetch('/signup', {
            method: 'POST',
           headers: {
                'Content-Type': 'application/json'
           },
           body: JSON.stringify({ lastName, userName, email, password, confirmPassword })
        })
        missingFirstName = response.ok

        


    },


]