const api = require('./api.ts')

const url = "http://localhost:3001"

api.Initialize_Schema_With_Dummy_Data()
api.Start_Server()

async function GetStatus() {
    const response = await fetch(url + "/", {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
    })

    
    return response
}

async function PostRegisterNewUser(subscription, firstName, lastName, userName, email, password, confirmPassword) {
    const response = await fetch(url + '/register', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({subscription, firstName, lastName, userName, email, password, confirmPassword })
    })
    return response
}

async function PostRegisterNewEvent(lat, lng, radius, startTime, endTime, eventCode, capacity) {
    const response = await fetch(url + '/register', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lat, lng, radius, startTime, endTime, eventCode, capacity })
    })
    return response
}

const tests = [
    () => {
        const response = GetStatus()
        response.then( (response) => {
            console.log(response.ok ? "GetStatus: Passed" : "GetStatus: Failed")
        })
    },

    () => {

        const firstName = "John"
        const lastName = "Doe"
        const userName = "JD123"
        const email = "test@test.com"
        const password = "password"
        const confirmPassword = "password"
        const subscription = "0"

        var response = PostRegisterNewUser(subscription, firstName, lastName, userName, email, password, confirmPassword)
        response.then( (response) => {
            console.log(response.ok ? "Valid Register: Passed" : `RegisterNewUser: Failed`)
        })
        
        response = PostRegisterNewUser(subscription, "", lastName, userName, email, password, confirmPassword)
        response.then( (response) => {
            console.log(response.ok ? "Missing first name: Failed" : "Missing first name: Passed")
        })
        
        response = PostRegisterNewUser(subscription, firstName, "", userName, email, password, confirmPassword)
        response.then( (response) => {
            console.log(response.ok ? "Missing last name: Failed" : "Missing first name: Passed")
        })
        
        response = PostRegisterNewUser(subscription, firstName, lastName, userName, "",  password, confirmPassword)
        response.then( (response) => {
            console.log(response.ok ? "Missing email: Failed" : "Missing email: Passed")
        })
        

        
        response = PostRegisterNewUser(subscription, firstName, lastName, userName, email, "",  confirmPassword)
        response.then( (response) => {
            console.log(response.ok ? "Missing password: Failed" : "Missing password: Passed")
        })
        
        response = PostRegisterNewUser(subscription, firstName, lastName, userName, email, password, "")
        response.then( (response) => {
            console.log(response.ok ? "Missing confirmed password: Failed" : "Missing confirmed password: Passed")
        })
    
        response = PostRegisterNewUser(subscription, firstName, lastName, userName, email, password, "wrongpassword")
        response.then( (response) => {
            console.log(response.ok ? "Password mismatch: Failed" : "Password mismatch: Passed")
        })
    },

    () => {
        const lat = "0"
        const lng = "0"
        const radius = "0"
        const startTime = "0"
        const endTime = "0"
        const eventCode = "0"
        const capacity = "0"

        const response = PostRegisterNewEvent(lat, lng, radius, startTime, endTime, eventCode, capacity)
        response.then( (response) => {
            console.log(response.ok ? "Valid Event Register: Passed" : `RegisterNewEvent: Failed: ${response.body}`)
        })
    }

]

tests.forEach(test => test())