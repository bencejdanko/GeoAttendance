const api = require('./api.ts')

api.app.get('/', api.Get_Status)

api.app.get('/users', api.List_Users)

api.app.get('/users/:id', api.Get_User)

api.app.post('/user', api.Register_New_User)

api.app.put('/user/:id', api.Modify_User)

api.app.delete('/user/:id', api.Delete_User)

api.app.listen(process.env.PORT, () => {
    console.log(`User API running on ${process.env.PORT}`)
})