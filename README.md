# Telemedicine Application Prototype

This is a repository for both backend and frontend layers of **Telemedicine App Prototype**

## Development

Development Board can be found here https://github.com/TelemedDevGroup/TelemedProtoApp/projects/1

## Demo Site (CI/CD)

Running Demo can be found here:
http://telemed-poc-back-dev.us-west-2.elasticbeanstalk.com/

---
## Backend

### Configuration
For local development please create file ```application-local.yaml``` alongside ```application.yaml``` and 
define personal application properties for example twilio API keys.

As you defined any local properties please run backend service with ```local``` profile. 

This file must not be pushed to the repository (preferably it should be added to ```.gitignore``` 
or moved another changelist).


---
## Frontend

### Configuration

For local development go to **frontend** folder as UI project directory.
You can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---
## Local installation

1. Install MySQL with default values and create schema ```telemedicine_demo```
1. Update application-local.yml file with all the required keys (e.g. client id and secret for oauth or twilio clients).
Also, please update credentials for database connection if you set different ones when installed database 
(```username``` and ```password``` in datasource section) .
1. Install Maven and Java (mvn and java have to be found on OS path)
1. Run following command from the root of the project: ```mvn spring-boot:run -Drun.profiles=local``` 
1. Profit - application is running on localhost:5000

