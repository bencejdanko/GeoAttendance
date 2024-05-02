# Expert User Documentation

### Install Requirements
#### NodeJS binaries

Download a binary at `https://nodejs.org/en/download`, and add the /bin/ folder to user PATH

#### Linux   
Linux machines can install via apt: `sudo apt update && sudo apt install postgresql`

Start the server with `sudo service postgresql start`

### Deployment details

The full deployment can be tested at at geoattendance.32kb.dev.

## Frontend Instructions

1. Open the terminal and clone the repository: `git clone https://github.com/bencejdanko/GeoAttendance/`
2. Navigate to GeoAttendance/dev/frontend
3. Install NodeJS NPM packages: `npm i`
4. Start the server: `npm start`
5. The website should now be displayed at the url: `http://localhost:3000`

## Backend testing
1. Clone the repository `git clone https://github.com/bencejdanko/GeoAttendance/`
2. Add `REACT_APP_PB_URL=http://127.0.0.1:8090` as an enviroment variables in a new file in `dev/frontend/.env`.
3. Add necessary enviroment variables to your pachine $PATH:
    - Follow instructions at https://developers.google.com/maps/documentation/javascript/get-api-key
    - Or, contact the developers for a key
    - Add under `GEOCODER_API_KEY=`
    - Add a random pass under `GEOPB_ADMIN_PASSWORD=`
    - Add a random username under `GEOPB_ADMIN_EMAIL=`
4. Navigate to `cd dev/backend-pb`
5. Download a pocketbase binary from https://github.com/pocketbase/pocketbase/releases, and you should see a `pocketbase` binary file. Make sure this is located in `dev/backend-pb`
6. Run the binary with `./pocketbase serve`
7. The backend should now be interactable with the frontend.
8. Enable emails
    - navigate to the Pocketbase interface (default http://127.0.0.1:8090/_/)
    - Enter in Admin credentials (`GEOPB_ADMIN_PASSWORD=` and `GEOPB_ADMIN_EMAIL=`)
    - Navigate to `Settings` on the left side
    - Navigate to `Mail settings`
    - Enter in your SMTP email server information (If credentials needed from developers, please contact us)
