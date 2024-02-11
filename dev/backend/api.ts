const query = require('./query.ts')
const schema = require('./schema.ts')

const postgres = require("postgres") //Pass postgresql.org enviroment variables via .env
const sql = postgres({})

//const result = schema.initialize_schema(sql)

module.exports = {

    Get_Status: async (request, response) => {
        response.json({ info: "GeoAttendence API" })
    },

    Register_New_User: async (request, response) => {
        const { password, email } = request.body
        const result = query.signup(sql, email, password)
        response.status(201).send(`${result}`)
    },

    Get_User: async (request, response) => {
        const id = parseInt(request.params.id)
        const result = await query.get_user(sql)
        response.status(200).json(result)
    },

    List_Users: async (request, response) => {
        const result = await query.get_users(sql)
        response.status(200).json(result)
    },

    Get_Public_User: async (request, response) => {

    },

    Modify_User: async (request, response) => {
        const id = parseInt(request.params.id)
        const { name, email } = request.body
        const result = await query.update_user(sql, name, email, id)
        response.status(200).send(`User modified with ID: ${id}`)
    },

    Delete_User: async (request, response) => {
        const id = parseInt(request.params.id)
        const status = query.delete_user(sql, id)
        response.status(200).send(`User deleted with ID: ${id}`)
    }

}