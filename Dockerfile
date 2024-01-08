# https://hub.docker.com/_/node
# Use oficial image from Node.js
FROM node:20.10.0

# Set work directory
WORKDIR /app

# Copy neccesary files from work directory
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Command to start application
CMD ["npm", "start"]
