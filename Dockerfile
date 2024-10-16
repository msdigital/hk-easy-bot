# Use the official Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Bundle the source code inside the container
COPY . .

# Make sure the entrypoint script is executable
RUN chmod +x /usr/src/app/docker-entrypoint.sh
# RUN ["chmod", "+x", "/usr/src/app/docker-entrypoint.sh"]

# Make port 3000 available to the world outside the container
EXPOSE 3000

# Set the entrypoint script as the default command to execute
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]