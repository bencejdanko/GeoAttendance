module.exports = {

    get_user: async (sql, id) => await sql`
        SELECT * FROM users WHERE id = ${id}
    `,

    get_users: async (sql, id) => await sql`
        SELECT * FROM users
    `,

    check_duplicate_email: async (sql, email) => await sql`
    `,

    signup: async (sql, email, password, ) => await sql`
        INSERT INTO users (email, password) VALUES (${email}, ${password})
    `,

    update_user: async (sql, email, password, id, ) => await sql`
        UPDATE users SET email = ${email}, password = ${password} WHERE id = ${id}
    `,

    delete_user: async (sql, id) => await sql`
        DELETE FROM users WHERE id = ${id}
    `
}