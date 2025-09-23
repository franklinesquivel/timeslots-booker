# Build stage
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile
COPY . .

RUN yarn build

# Production stage
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY entrypoint.sh .

RUN npx prisma generate

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["yarn", "start:prod"]
