# HK Easy Bot

## Description
HK Easy Bot is a custom Discord bot that integrates with external APIs to dynamically update user roles. It offers a range of features tailored for an enhanced Discord user experience.

## Features
- Periodic synchronization with external APIs.
- Automatic updating of Discord user roles based on external data.
- Flexible and customizable for different server setups.

## Technologies
This project is built using:
- Node.js (v18)
- Discord.js
- Express
- Axios for HTTP requests
- dotenv for environment variable management during development
- Docker for containerization

## Environment Variables
To run the HK Easy Bot, you need to set the following environment variables:

- `EASY_API_URI`: The URI of the external API.
- `EASY_API_KEY`: The API key for accessing the external API.
- `DISCORD_TOKEN`: The token for your Discord bot.
- `PORT` (optional for development): The port number for the Express server.

### Setting up Environment Variables

#### Development
For development, create a `.env` file in the root directory and set the variables like so:
EASY_API_URI=https://api.example.com/
EASY_API_KEY=your_api_key
DISCORD_TOKEN=your_discord_bot_token
PORT=3000

#### Production
In production, set these variables in your Docker run command or orchestration tool configuration:
```
docker run -d -p 3000:3000 -e EASY_API_URI=https://api.example.com/ -e EASY_API_KEY=your_api_key -e DISCORD_TOKEN=your_discord_bot_token hk-easy-bot
```

## Installation and Setup

### Development Setup
1. **Clone the Repository:**
  ```
  git clone [URL of the GitHub repo]
  ```

2. **Navigate to the Project Directory:**
  ```
  cd hk-easy-bot
  ```

3. **Environment Setup:**
  - Create a .env file in the root directory.
  - Add the necessary environment variables (refer to .env.example for guidance).
  - Using Docker-Compose (Recommended for Development):
  ```
  docker-compose up --build
  ```

4. **Alternative Method Using Makefile:**
  - Ensure you have make installed.
  - Run make build and make run.

### Production Setup
For production, use Docker directly:

1. **Build the Docker Image:**
  ```
  docker build -t hk-easy-bot .
  ```

2. **Run the Docker Container:**
  - Ensure all necessary environment variables are set in your production environment.
  ```
  docker run -d -p 3000:3000 -e EASY_API_KEY=your_api_key hk-easy-bot
  ```
  Replace your_api_key with your actual API key.

## Contributing
Contributions to HK Easy Bot are welcome. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your features or fixes.
3. Commit your changes with clear, descriptive messages.
4. Create a pull request with a detailed description of your changes.

## License
HK Easy Bot is released under the [GPL-3.0 License](LICENSE).