# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy both package.json and package-lock.json files
COPY package*.json ./
# COPY certs*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build your application
RUN npm run build

# Install a lightweight web server to serve the static files
RUN npm install -g serve

# Expose the port your app runs on
EXPOSE 5173

# Command to run your app
CMD ["serve", "server.js", "-s", "dist", "-l", "5173"]
