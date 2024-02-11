const express = require("express")
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const api = require('./api.ts')

app.get('/', api.Get_Status)

app.get('/users/:id', api.Get_User)

app.post('/user', api.Register_New_User)

app.put('/user/:id', api.Modify_User)

app.delete('/user/:id', api.Delete_User)

app.listen(process.env.PORT, () => {
    console.log(`User API running on ${process.env.PORT}`)
})