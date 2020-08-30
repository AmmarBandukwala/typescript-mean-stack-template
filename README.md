# MEAN (Mongo,Express,Angular,Node) Solution Template using TypeScript

## Prerequisites

- Node.js & npm: Runtime environment and package manager.
- MongoDB: NoSql Document DB
- AngularCLI: Angular Command Line to Build Front End
- Docker: Containerization and Deployment
- Mocha: Javascript Testing Framework

## Folder Structure

- /e2e: End-to-End testing protractor
- /server: Files to be used on server-side
  - /server/config: Configuration setup of express/environment variables/connections
  - /server/controllers: Express API route logic
  - /server/models: Contains mongoose Schemas
  - /server/routes: Declared routes to be imported on index.js
  - /server/services: Middleware
  - /server/index.js: File that is used to start the node server
- /src: Angular application
- /test: Mocha Test
- /DockerFile: Docker configuration for application container
- /docker-compose: Deploy containers that makeup entire stack

## Usage

- Download this project on your computer
- Be sure you have started MongoDB service before running the application
- Navigate on project folder
- Run ng build on here to generate Angular necessary files. Output files are by default created on /dist subfolder
- Now run node index.js This is the last step and if everything goes right, server will start listening for requests
- You can open your browser and navigate to localhost:3000 to see if application works
