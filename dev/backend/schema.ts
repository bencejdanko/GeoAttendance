module.exports = {
    
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