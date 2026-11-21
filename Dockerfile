FROM node:24.22.3-alpine3.24@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5 AS base
WORKDIR /usr/src/app
RUN apk add --no-cache openssl

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
