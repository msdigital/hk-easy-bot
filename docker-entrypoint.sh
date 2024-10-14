#!/bin/bash
# docker-entrypoint.sh

# Check the NODE_ENV environment variable
if [ "$NODE_ENV" = "development" ]; then
  # If in development, run the application with nodemon
  npm run dev
else
  # If not in development (assume production), run the application with node
  node src/app.js
fi