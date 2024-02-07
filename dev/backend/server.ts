const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const port = 3001;

app.set("port", process.env.PORT || port)

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'bence',
    password: 'password',
    database: 'api',
    port: 5432
})

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/', (request, response) => {
    response.json({ info: "GeoAttendence API" })
})

app.get('/users', (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

app.get('/users/:id', (request, response) => {
    const id = parseInt(request.params.id)
    pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.show)
    })
})

app.post('/user', (request, response) => {
    const { name, email } = request.body
    pool.query(`INSERT INTO users (name, email) VALUES (${name}, ${email}) RETURNING *`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User ${results.rows[0].id} added`)
    })
})

app.put('/user/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        `UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id}`,
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
})

app.delete('/user/:id', (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
})

app.listen(port, () => {
    console.log(`User API running on ${port}`)
})