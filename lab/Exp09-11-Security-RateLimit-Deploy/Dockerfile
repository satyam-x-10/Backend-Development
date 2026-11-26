# Use official Node LTS Alpine image (small footprint)
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (layer caching optimization)
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy the rest of the source code
COPY . .

# Expose the port the app listens on
EXPOSE 3009

# Health check for Docker
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD wget -qO- http://localhost:3009/health || exit 1

# Start the application
CMD ["node", "server.js"]
