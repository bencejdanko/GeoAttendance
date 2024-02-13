# Setup Instructions (Work in progress)
Install postgresql on your device
Create a user, database, and password

Fill in .env file with:
- PGUSER=
- PGPASSWORD
- PGDATABASE
- PGPORT
- PGHOST
- PORT

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

