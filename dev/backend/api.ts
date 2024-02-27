const express = require("express")
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const query = require('./query.ts')
const schema = require('./schema.ts')

const postgres = require("postgres") //Pass postgresql.org enviroment variables via .env
const sql = postgres({})

const jwt = require('jsonwebtoken')

const Get_Status = async (request, response) => {
        response.json({ info: "GeoAttendence API" })
}

const Get_Users = async (request, response) => {
        const result = await query.get_users(sql)
        response.status(200).json(result)
}

const Register_New_User = async (request, response) => {
        const { firstName, lastName, userName, email, password, confirmPassword } = request.body
        
        if (!firstName) {
            response.status(404).json({
                "error": "No first name provided"
            })
            return
        }

        if (!lastName) {
            response.status(404).json({
                "error": "No last name provided"
            })
            return
        }

        if (!userName) {
            response.status(404).json({
                "error": "No username provided"
            })
            return
        }

        if (!email) {
            response.status(404).json({
                "error": "No password provided",
            })
            return
        }
        
        if (!password) {
            response.status(404).json({
                "error": "No password provided"
            })
            return
        }
        
        if (!confirmPassword) {
            response.status(404).json({
                "error": "No confirm password provided"
            })
            return
        }

        if (confirmPassword != password) {
            response.status(404).json({
                "error": "Your passwords do not match"
            })
            return
        }

        const result = await query.register_new_user(sql, email, password)
        console.log(result)
        response.status(201).send(`${result}`)
}

const Login_User = async (request, response) => {
        const { email, password } = request.body

        if (!email) {
            response.status(400).json({
                "error": "No email provided"
            })
            return
        }

        if (!password) {
            response.status(400).json({
                "error": "No password provided"
            })
            return
        }

        
        const result = await query.get_user(sql, email, password) 
        const user = result[0]

        if (user === undefined) {
            response.status(401).json({
                "error": "Invalid credentials"
            })
            return
        }

        const jwtSecretKey = process.env.JWT_SECRET_KEY
        const token = jwt.sign({
            userID: user.id,
        }, jwtSecretKey, { expiresIn: '1h' })

        response.status(200).json({ token })
}

const Get_User = async (request, response) => {
        const id = parseInt(request.params.id)
        const result = await query.get_user(sql)
        response.status(200).json(result)
}

const List_Users = async (request, response) => {
        const result = await query.get_users(sql)
        response.status(200).json(result)
}

const Get_Public_User = async (request, response) => {

}

const Modify_User = async (request, response) => {
        const id = parseInt(request.params.id)
        const { name, email } = request.body
        const result = await query.update_user(sql, name, email, id)
        response.status(200).send(`User modified with ID: ${id}`)
}

const Delete_User = async (request, response) => {
        const id = parseInt(request.params.id)
        const status = await query.delete_user(sql, id)
        response.status(200).send(`User deleted with ID: ${id}`)
    }

module.exports = {

    Initialize_Schema: async () => {
        await schema.initialize_schema(sql)
    },

    Initialize_Schema_With_Dummy_Data: async () => {
        await schema.initialize_schema(sql)
        await schema.insert_dummy_data(sql)
    },

    Start_Server: async () => {
        app.get(    '/',            Get_Status)
        app.get(    '/users',       Get_Users)
        app.get(    '/users/:id',   Get_User)
        app.post(   '/user',        Register_New_User)
        app.put(    '/user/:id',    Modify_User)
        app.delete( '/user/:id',    Delete_User)
        app.post(   '/login',       Login_User)
        app.post(   '/signup',      Register_New_User)
        app.listen(process.env.PORT, () => {
            console.log(`User API running on ${process.env.PORT}`)
        })
    }
}

