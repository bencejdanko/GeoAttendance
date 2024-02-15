# Setup Instructions (Work in progress)

## 1. Install a PostgreSQL server & initialize a database

### Linux & WSL2

Install postgres service:

`sudo apt update && sudo apt install postgresql`

Start the server:

`sudo service postgresql start`

Login as postgres
    
`sudo -u postgres -i`

Create a database (Remember the name):

`createdb mydatabase`

Enter database:

`psql mydatabase`

 You should now see a #= prompt to indicate you are interacting with the database.

Create a user:
    
`CREATE USER admin WITH PASSWORD 'password';`

Exit database prompt:

`\q`

Logout of postgres account:

`exit`

You should now be back in your original account. Create a new .env file in `/dev/backend` with PostgreSQL enviroment information:

```
PGUSER=            #The user we created
PGPASSWORD=        #the password created
PGDATABASE=        #the database name
PGPORT=5432        #this is the default unless it is explicitly changed
PGHOST=localhost    
PORT=              #the port you would like the API server to run on
```

2. Install NodeJS

Install the binaries from https://nodejs.org/en/download, and add its `bin` folder to your system $PATH variable

Navigate to the /dev/backend folder and install the necessary packages:

`npm i`

3. Initialize server

Start the API service with 'npm start'.

# GeoAttendance API

### Get Status
`GET https://api..com`**/**

Returns the status of the GeoAttendance API.

#### Body
    
- **status**  *string*
    - Current status of the server
- **stats** *object*
    - Current inserver stats
        - **users** *integer* 
            - Amount of users signed up
-

    //Response Example 

    {
        "status": "string",
        "stats": {
            "users": 0,
        }
    }


## Users

### Get Users

### List Users

## 

