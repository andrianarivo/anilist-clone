#!/bin/bash
# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Execute the passed command
exec "$@"
