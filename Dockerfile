# Use a base image with node and build essentials
FROM node:20-buster

# Install dependencies and Bun
RUN apt-get update && \
    apt-get install -y curl git unzip && \
    curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Enable Corepack and use correct Yarn version
RUN corepack enable && \
    corepack prepare yarn@4.0.2 --activate

# Set working directory
WORKDIR /app

# Copy the Docker-specific package.json from init directory
COPY ./init/package.json ./package.json

# Create bunfig.toml with proper JSX configuration
RUN echo '[runtime]' > bunfig.toml && \
    echo 'jsx = "react"' >> bunfig.toml && \
    echo 'jsx-runtime = "automatic"' >> bunfig.toml && \
    echo 'jsx-import-source = "react"' >> bunfig.toml

# Install dependencies including Bun
RUN yarn install && \
    bun install react

# Copy the tldraw-sync code
COPY . .

# Expose the port the app runs on
EXPOSE ${PORT_TLDRAW_SYNC}

# Command to run only the Bun server
CMD ["yarn", "dev-server-bun"]