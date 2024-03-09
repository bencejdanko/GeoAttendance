module.exports = {

    get_user: async (sql, email, password) => {return await sql`
        SELECT * FROM users WHERE email=${email} AND password=${password}
    `},

    get_users: async (sql, id) => await sql`
        SELECT * FROM users
    `,

    check_duplicate_email: async (sql, email) => await sql`
        SELECT id FROM users WHERE email=${email}
    `,

    register_new_user: async (sql, subscription, firstName, lastName, userName, email, password, ) => await sql`
        INSERT INTO users (subscription, username, email, password, firstname, lastname) VALUES (
            ${subscription}, ${userName}, ${email}, ${password}, ${firstName}, ${lastName})
    `,

    register_new_event: async (sql, lat, lng, radius, startTime, endTime, eventName, eventCode, capacity) => await sql`
        INSERT INTO events (event_code, capacity, name, created_date) VALUES (
            ${eventCode}, ${capacity}, ${eventName}, NOW());

        INSERT INTO location (longitude, latitude, radius, eid) VALUES (${lng}, ${lat}, ${radius}, (SELECT id FROM events WHERE event_code=${eventCode}));

        INSERT INTO event_history (eid) VALUES ((SELECT id FROM events WHERE event_code=${eventCode}));
        
    `.simple(),

    check_duplicate_event: async (sql, event_code) => await sql`
        SELECT event_code FROM events WHERE event_code=${event_code}
    `,

    update_user: async (sql, email, password, id, ) => await sql`
        UPDATE users SET email = ${email}, password = ${password} WHERE id = ${id}
    `,

    delete_user: async (sql, id) => await sql`
        DELETE FROM users WHERE id = ${id}
    `
}