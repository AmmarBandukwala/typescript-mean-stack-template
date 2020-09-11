# MEAN (Mongo,Express,Angular,Node) Solution Template using TypeScript

## Prerequisites

- Node.js & npm: Runtime environment and package manager.
- MongoDB: NoSql Document DB
- AngularCLI: Angular Command Line to Build Front End
- Docker: Containerization and Deployment
- Mocha: Javascript Testing Framework

## Folder Structure

- /angular-client - Front End Application Client
- /express-server - Back End Node Express API
  - /config: Configuration setup of express/environment variables/connections
  - /controllers: Express API route logic
  - /models: Contains mongoose Schemas
  - /routes: Declared routes to be imported on index.js
  - /services: Middleware
  - /server.ts: File that is used to start the node server
  - /test: Mocha Test
- /DockerFile: Docker configuration for application container
- /docker-compose: Deploy containers that makeup entire software stack

## Usage

- Clone Project from GitHub
- Execute Command

```shell
docker-compose up --build
```

- Browse 127.0.0.1 (Default Docker Host)