# Use a base image with node and build essentials
FROM node:20-buster

# Install dependencies and Bun
RUN apt-get update && \
    apt-get install -y curl git unzip && \
    curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Set working directory
WORKDIR /app

# Copy the Docker-specific package.json from init directory
COPY ./init/package.json ./package.json

# Create bunfig.toml with proper JSX configuration
RUN echo '[runtime]' > bunfig.toml && \
    echo 'jsx = "react"' >> bunfig.toml && \
    echo 'jsx-runtime = "automatic"' >> bunfig.toml && \
    echo 'jsx-import-source = "react"' >> bunfig.toml

# Install dependencies using bun instead of npm
RUN bun install

# Copy the tldraw-sync code
COPY . .

# Create logs directory
RUN mkdir -p /app/logs && chmod 777 /app/logs

# Expose the port the app runs on
EXPOSE ${PORT_TLDRAW_SYNC}

# Set environment variables
ENV LOG_PATH=/app/logs

# Command to run only the Bun server
CMD ["bun", "run", "dev-server-bun"]