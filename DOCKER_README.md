# Docker Setup for Art Store

This guide explains how to run the Art Store application using Docker and Docker Compose.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (usually included with Docker Desktop)

## Quick Start

### Production Environment

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - MongoDB: localhost:27017

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

### Development Environment

1. **Build and start development services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000 (with hot reloading)
   - MongoDB: localhost:27017

3. **Stop development services:**
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

## Environment Variables

The following environment variables are configured in the Docker Compose files:

- `MONGO_URI`: MongoDB connection string
- `TOKEN_SECRET`: JWT token secret (change in production)
- `NODE_ENV`: Environment (production/development)
- `NEXT_TELEMETRY_DISABLED`: Disable Next.js telemetry

## Database Setup

MongoDB is automatically initialized with:
- Database: `users`
- Admin user: `admin` / `password123`
- Application user: `artstore_user` / `artstore_password`

## Useful Commands

### View logs
```bash
# Production logs
docker-compose logs -f app

# Development logs
docker-compose -f docker-compose.dev.yml logs -f app

# MongoDB logs
docker-compose logs -f mongodb
```

### Access containers
```bash
# Access app container
docker exec -it art-store-app bash

# Access MongoDB container
docker exec -it art-store-mongodb mongosh
```

### Clean up
```bash
# Remove containers and networks
docker-compose down

# Remove containers, networks, and volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all
```

## Production Deployment

For production deployment:

1. **Update environment variables:**
   - Change `TOKEN_SECRET` to a secure random string
   - Update MongoDB credentials
   - Set proper `NODE_ENV=production`

2. **Use production compose file:**
   ```bash
   docker-compose up --build -d
   ```

3. **Set up reverse proxy (optional):**
   - Use nginx or traefik for SSL termination
   - Configure proper domain names

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Change ports in docker-compose.yml
   - Stop other services using the same ports

2. **MongoDB connection issues:**
   - Ensure MongoDB container is running
   - Check connection string in environment variables

3. **Build failures:**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild without cache: `docker-compose build --no-cache`

### Logs and Debugging

```bash
# View all container logs
docker-compose logs

# View specific service logs
docker-compose logs app

# Follow logs in real-time
docker-compose logs -f
```

## File Structure

```
art-store/
├── Dockerfile              # Production Dockerfile
├── Dockerfile.dev          # Development Dockerfile
├── docker-compose.yml      # Production compose file
├── docker-compose.dev.yml  # Development compose file
├── .dockerignore           # Docker ignore file
├── mongo-init.js           # MongoDB initialization script
└── DOCKER_README.md        # This file
```

## Security Notes

- Change default passwords in production
- Use environment files for sensitive data
- Enable MongoDB authentication
- Use proper SSL certificates
- Regularly update base images 