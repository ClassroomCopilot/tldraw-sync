# syntax=docker/dockerfile:1

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

# Copy package files first
COPY package*.json ./

# Install dependencies using bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Create logs directory
RUN mkdir -p /app/logs && chmod 777 /app/logs

# Expose port 5002 explicitly
EXPOSE 5002

# Set environment variables
ENV LOG_PATH=/app/logs

# Use npm/bun scripts to run the server
CMD ["bun", "run", "dev-server-bun"]