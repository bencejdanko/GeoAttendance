const api = require('./api.ts')

const needed_envs = [
    process.env.PGUSER,
    process.env.PGPASSWORD,
    process.env.PGDATABASE,
    process.env.PGPORT,
    process.env.PGHOST,
    process.env.PORT,
    process.env.SUITE,
    process.env.JWT_SECRET_KEY
]

for (const env in needed_envs) {
    console.log(env)
    if (!env) {
        console.log("Missing a critical enviroment variable")
        process.exit()
    }
}

if (process.env.SUITE = "PRODUCTION") {
    console.log("Production server")
    api.Start_Server()
} else if (process.env.SUITE = "DEVELOPMENT") {
    console.log("Development server")
    api.Initialize_Tester_Schema()
    api.Start_Server()
} else {
    console.log("Process suite unspecified, operation cancelled")
}