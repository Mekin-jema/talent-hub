FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Default command: start server (production mode)
CMD ["npm", "run", "start"]
