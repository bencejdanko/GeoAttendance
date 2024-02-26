module.exports = {

    initialize_schema: async (sql) => {
        const result = await sql`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS events;
            DROP TABLE IF EXISTS feedback;
            DROP TABLE IF EXISTS event_history;
            DROP TABLE IF EXISTS feedback_history;
            DROP TABLE IF EXISTS location;
            DROP TABLE IF EXISTS time;
        
            CREATE TABLE users (
                id SERIAL PRIMARY KEY, 
                role smallint, 
                email varchar(30),
                password varchar(30),
                firstName varchar(30),
                lastName varchar(30)
            );
        
            CREATE TABLE events (
                id SERIAL PRIMARY KEY,
                capacity integer,
                name varchar(30),
                created_date timestamp
            );
        
            CREATE TABLE location (
                longitude double precision,
                latitude double precision,
                radius double precision,
                eid integer NOT NULL
            );
        
            CREATE TABLE time (
                start_time timestamp,
                end_time timestamp,
                eid integer
            );
        
            CREATE TABLE feedback (
                id SERIAL PRIMARY KEY,
                submitted_time timestamp,
                userid integer,
                is_responded boolean
            );
        
            CREATE TABLE feedback_history (
                id SERIAL PRIMARY KEY
            );
            `.simple()
    },

    insert_dummy_data: async (sql) => {
        const result = await sql`
            INSERT INTO users (role, email, password, firstName, lastName) 
            VALUES (0, 'example@example.com', 'password', 'bence', 'danko');
        `.simple()
    }
}