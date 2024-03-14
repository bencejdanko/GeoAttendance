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

