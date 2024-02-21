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
        const { email, password } = request.body
        
        if (!email) {
            response.status(404).json({
                "error": "No password provided.",
            })
        }
        
        if (!password) {
            response.status(404).json({
                "error": "No password provided."
            })
        }
        
        const result = await query.signup(sql, email, password)
        //need to check for duplicates; integrity error
        response.status(201).send(`${result}`)
}

const Login_User = async (request, response) => {
        const { email, password } = request.body

        console.log(request.body)
        if (!email) {
            response.status(404).json({
                "error": "No email provided"
            })
            return
        }

        if (!password) {
            response.status(404).json({
                "error": "No password provided"
            })
            return
        }

        const result = await query.get_user(email, password)

        response.status(200).json(result)

        /* JWT-based user authentication */
        const jwtSecretKey = process.env.JWT_SECRET_KEY

        
        
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

    Initialize_Dummy_Data: async () => {
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
        app.listen(process.env.PORT, () => {
            console.log(`User API running on ${process.env.PORT}`)
        })
    }
}

