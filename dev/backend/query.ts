module.exports = {

    get_user: async (sql, email, password) => {return await sql`
        SELECT * FROM users WHERE email=${email} AND password=${password}
    `},

    get_users: async (sql, id) => await sql`
        SELECT * FROM users
    `,

    check_duplicate_email: async (sql, email) => await sql`
    `,

    register_new_user: async (sql, subscription, firstName, lastName, userName, email, password, ) => await sql`
        INSERT INTO users (subscription, username, email, password, firstname, lastname) VALUES (
            ${subscription}, ${userName}, ${email}, ${password}, ${firstName}, ${lastName})
    `,

    update_user: async (sql, email, password, id, ) => await sql`
        UPDATE users SET email = ${email}, password = ${password} WHERE id = ${id}
    `,

    delete_user: async (sql, id) => await sql`
        DELETE FROM users WHERE id = ${id}
    `
}