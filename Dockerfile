# Frontend Stage
FROM node:18 AS frontend

WORKDIR /app/frontend
COPY crypto-frontend/package.json crypto-frontend/package-lock.json ./
RUN npm install
COPY crypto-frontend/ ./
RUN npm run build

# Backend Stage
FROM node:18 AS backend

WORKDIR /app/backend
COPY crypto-backend/package.json crypto-backend/package-lock.json ./
RUN npm install
COPY crypto-backend/ ./

# Serve static frontend files with Express
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 5000
CMD ["node", "index.js"]
