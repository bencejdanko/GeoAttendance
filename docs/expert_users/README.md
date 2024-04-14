# Expert User Documentation

### Install Requirements
#### NodeJS binaries

Download a binary at `https://nodejs.org/en/download`, and add the /bin/ folder to user PATH

#### PostgreSQL server
#### Linux   
Linux machines can install via apt: `sudo apt update && sudo apt install postgresql`

Start the server with `sudo service postgresql start`

#### Postman

For API testing

## Frontend Instructions

1. Open the terminal and clone the repository: `git clone https://github.com/bencejdanko/GeoAttendance/`
2. Navigate to GeoAttendance/dev/frontend
3. Create a new .env file, and add a Google Maps API Key:
    - Follow instructions at https://developers.google.com/maps/documentation/javascript/get-api-key
    - Or, contact the developers for a key
4. Install NodeJS NPM packages: `npm i`
5. Start the server: `npm start`
6. The website should now be displayed at the url: `http://localhost:3000`

## Backend testing
1. Clone the repository `git clone https://github.com/bencejdanko/GeoAttendance/`
2. Navigate to `cd dev/backend-pb`
3. Download a pocketbase binary from https://github.com/pocketbase/pocketbase/releases, and you should see a `pocketbase` binary file
4. Add `REACT_APP_PB_URL=http://127.0.0.1:8090` to the enviroment variables in `dev/frontend/.env`
5. In `dev/backend-pb`, give permissions to the startup script, `chmod +x run.sh`
6. Run with `./run.sh --clear`

## Backend testing (Deprecated)
1. Clone the repository `git clone https://github.com/bencejdanko/GeoAttendance/`
2. Setup a Postgres Database and Superuser with a password

Login as postgres
    
`sudo -u postgres -i`

Create a database (Remember the name):

`createdb mydatabase`

Use and enter the database:

`psql mydatabase`

 You should now see a #= prompt to indicate you are interacting with the database.

Create a user:
    
`CREATE USER admin WITH PASSWORD 'password';`

Give the user Superuser privileges:

`ALTER USER admin WITH SUPERUSER;`

Exit database prompt:

`\q`

Logout of postgres account:

`exit`

3. Update backend enviroment variables

Create a new `.env` file in `/dev/backend` with PostgreSQL enviroment information:

```
PGUSER=            #The user we created
PGPASSWORD=        #the password created
PGDATABASE=        #the database name
PGPORT=5432        #this is the default unless it is explicitly changed
PGHOST=localhost    
PORT=3001           #the port you would like the API server to run on

JWT_SECRET_KEY=ga_secret_key #When user logs in, they recieve a key
```

4. Navigate to `GeoAttendance/dev/backend` and start the API server with `npm start`
