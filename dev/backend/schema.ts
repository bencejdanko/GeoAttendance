module.exports = {
    
    initialize_schema: (sql) => sql`
        IF TABLE IF EXISTS users DROP;

        CREATE TABLE users (
            email varchar(30),
            password varchar(30),
            id SERIAL PRIMARY KEY
        );

    `
}