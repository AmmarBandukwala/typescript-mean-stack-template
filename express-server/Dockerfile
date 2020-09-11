 # Create image based on the official Node 6 image from the dockerhub
FROM node:12

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json /usr/src/app/

# Install dependecies
RUN npm install && npm cache clean --force --loglevel=error

# Get all the code needed to run the app
COPY . /usr/src/app/

# Run Build to Output Javascript
RUN npm run build

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD [ "node", "dist/server.js" ]