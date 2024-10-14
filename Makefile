# Define default action when you just call 'make'
all: build up

# Build the Docker images
build:
	docker-compose build

# Start the containers
up:
	docker-compose up -d

# Stop the containers
down:
	docker-compose down

# View logs
logs:
	docker-compose logs

# Rebuild the containers
rebuild: down build up

# Enter the Node.js app container
exec:
	docker-compose exec app sh

# Clean up any stopped containers and unused images and volumes
clean:
	docker-compose down --rmi all -v