// collection = new Collection({
//     name: "events",
//     type: "base",
//     listRule: null,
//     viewRule:   "@request.auth.id != ''",
//     createRule: "",
//     updateRule: "@request.auth.id != ''",
//     deleteRule: null,

//     schema: [
//         {
//             name: "event_name",
//             type: "text",
//             required: true,
//             options: {
//                 min: 3,
//                 max: 100
//             }
//         },

//         {
//             name: "users",
//             type: "relation",
//             required: false,
//             options: {
//                 maxSelection: 1,
//                 collectionId: "_pb_users_auth_",

//             }
            
//         }
//     ],

//     indexes: [
//         "CREATE UNIQUE INDEX idx_user ON example (user)"
//     ],

//     options: {}
// })

// $app.dao().saveCollection(collection)

routerAdd("GET", "/hello/:name", (c) => {
    let name = c.pathParam("name")
    return c.json(200, { "message": "Hello " + name })
})

routerAdd("GET", "/users", (c) => {

    const result = arrayOf(new DynamicModel({
        "id":    "",
        "email": "",
    }))


    $app.dao().db()
    .select("id", "email")
    .from("users")
    .all(result)

    return c.json(200, result)
    
})

