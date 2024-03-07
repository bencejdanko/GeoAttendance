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
                subscription smallint NOT NULL DEFAULT 0, 
                username varchar(30) UNIQUE NOT NULL,
                email varchar(30) UNIQUE NOT NULL,
                password varchar(30) NOT NULL,
                firstname varchar(30) NOT NULL,
                lastname varchar(30) NOT NULL
            );
        
            CREATE TABLE events (
                id SERIAL PRIMARY KEY,
                capacity integer,
                name varchar(30),
                created_date timestamp
            );

            CREATE TABLE event_history (
                id serial primary key,
                eid integer references events(id),
                uid integer references users(id),
                checkin_time timestamp,
                checkout_time timestamp
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
            INSERT INTO users (username, subscription, email, password, firstName, lastName) 
            VALUES ('bdanko', 0, 'example@example.com', 'password', 'bence', 'danko');
        `.simple()
    }
}