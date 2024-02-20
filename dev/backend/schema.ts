const schema_queries = [
    `DROP TABLE IF EXISTS users`,
    
    `DROP TABLE IF EXISTS events`,

    `DROP TABLE IF EXISTS feedback`,

    `DROP TABLE IF EXISTS event-history`,

    `DROP TABLE IF EXISTS feedback-history`,

    /*
    Authentication: 
    0 is user
    1 is a paid host
    3 is an administrator
    */
    `CREATE TABLE users (
        id SERIAL PRIMARY KEY, 
        role smallint, 
        email varchar(30),
        password varchar(30),
    )`,

    `CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        capacity integer,
        name varchar(30),
        created_date timestamp
    )`,

    `CREATE TABLE location (
        longitude double precision,
        latitude double precision,
        radius double precision,
        eid integer NOT NULL
    )`,

    `CREATE TABLE time (
        start_time timestamp,
        end_time timestamp,
        eid integer
    )`, 

    `CREATE TABLE feedback (
        id SERIAL PRIMARY KEY,
        submitted_time timestamp,
        userid integer,
        is_responded boolean
    )`,

    `CREATE TABLE feedback-history (
        id SERIAL PRIMARY KEY,
        
    )`

]

module.exports = {

    initialize_schema: async (sql) => {
        for (var query of schema_queries) {
            const result = sql(query)
        }
    },
    
    drop_user_table: async (sql) => {
        const result = await sql`
            DROP TABLE IF EXISTS users;
        `
    },

    create_user_table: async (sql) => {
        const result = await sql`
            CREATE TABLE users (
                email varchar(30),
                password varchar(30),
                id SERIAL PRIMARY KEY
            );
        `
    },

    insert_dummy_data: async (sql) => {
        const result = await sql`
            INSERT INTO users (email, password) 
            VALUES ('example@example.com', 'password');
        `
    }
}