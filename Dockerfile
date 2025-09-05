FROM node:20.17.0-alpine3.20@sha256:2d07db07a2df6830718ae2a47db6fedce6745f5bcd174c398f2acdda90a11c03 AS base
WORKDIR /usr/src/app

FROM base AS builder-deps
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate

FROM base AS deps
COPY package*.json ./
RUN npm ci --omit=dev
COPY prisma ./prisma
RUN npx prisma generate

FROM builder-deps AS builder
COPY . .
RUN npm run build

FROM base
ENV NODE_ENV=production
RUN apk add dumb-init
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build .
EXPOSE 3000
CMD ["dumb-init", "node", "server.js"]
