
# HK Easy Bot

## Description
HK Easy Bot is a Discord bot designed to enhance the experience of Discord users. It integrates with external APIs to dynamically update user roles and provides a range of useful features and interactions.

## Features
- Periodic synchronization with external APIs.
- Dynamic updating of Discord user roles.
- Customizable and extendable for various Discord server setups.

## Technologies
- Node.js (v18)
- Discord.js
- Express
- Axios
- dotenv for environment variable management
- Docker for containerization
- Nodemon for development efficiency

## Installation and Setup with Docker
This project is containerized using Docker, making setup and deployment straightforward and consistent across different environments.

1. **Prerequisites:**
   - Ensure Docker and Docker Compose are installed on your machine.

2. **Clone the repository:**
   ```
   git clone https://github.com/msdigital/hk-easy-bot
   ```

3. **Navigate to the project directory:**
   ```
   cd hk-easy-bot
   ```

4. **Set up environment variables:**
   - Copy the `.env.example` file to a new file named `.env`.
   - Fill in the required API keys and bot tokens in the `.env` file.

5. **Build and Run the Docker Container:**
   ```
   docker-compose up --build
   ```
   This command builds the Docker image and starts the container. The bot will automatically start as defined in the Dockerfile and `docker-entrypoint.sh`.

## Configuration
- The configuration of the bot and its interaction with external APIs can be managed through environment variables in the `.env` file.
- Update the `docker-compose.yml` and `Dockerfile` as needed for Docker-based deployment.

## Contributing
Contributions to HK Easy Bot are welcome. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your features or fixes.
3. Commit your changes with clear, descriptive messages.
4. Create a pull request with a detailed description of your changes.

## License
HK Easy Bot is released under the [GPL-3.0 License](LICENSE).