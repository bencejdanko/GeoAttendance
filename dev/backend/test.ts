const api = require('./api.ts')

const url = "http://localhost:3001"

api.Initialize_Schema_With_Dummy_Data()
api.Start_Server()

function GetStatus() {
    const response = fetch(url + "/", {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
    })
    return response
}

function PostRegisterNewUser(firstName, lastName, userName, email, password, confirmPassword) {
    const response = fetch(url + '/signup', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, userName, email, password, confirmPassword })
    })
    return response
}

const tests = [
    async () => {


        const response = await GetStatus()
        console.log(response.ok ? "GetStatus: Passed" : "GetStatus: Failed")
    },

    async () => {

        const firstName = "John"
        const lastName = "Doe"
        const userName = "JD123"
        const email = "test@test.com"
        const password = "password"
        const confirmPassword = "password"

        var response = await PostRegisterNewUser(firstName, lastName, userName, email, password, confirmPassword)
        console.log(response.ok ? "Valid Register: Passed" : "RegisterNewUser: Failed")

        response = await PostRegisterNewUser("", lastName, userName, email, password, confirmPassword)
        console.log(response.ok ? "Missing first name: Failed" : "Missing first name: Passed")

        response = await PostRegisterNewUser(firstName, "", userName, email, password, confirmPassword)
        console.log(response.ok ? "Missing last name: Failed" : "Missing first name: Passed")

        response = await PostRegisterNewUser(firstName, lastName, userName, "",  password, confirmPassword)
        console.log(response.ok ? "Missing email: Failed" : "Missing email: Passed")

        response = await PostRegisterNewUser(firstName, lastName, userName, email, "",  confirmPassword)
        console.log(response.ok ? "Missing password: Failed" : "Missing password: Passed")

        response = await PostRegisterNewUser(firstName, lastName, userName, email, password, "")
        console.log(response.ok ? "Missing confirmed password: Failed" : "Missing confirmed password: Passed")

        response = await PostRegisterNewUser(firstName, lastName, userName, email, password, "wrongpassword")
        console.log(response.ok ? "Password mismatch: Failed" : "Password mismatch: Passed")

    },

]

tests.forEach(test => test())