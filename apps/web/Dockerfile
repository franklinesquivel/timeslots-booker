# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Define build arguments
ARG VITE_API_URL

# Set them as environment variables
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# The build command will now have access to the environment variables
RUN yarn build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
