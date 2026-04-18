# syntax=docker/dockerfile:1

# -----------------------------------------------------------------------------
# Dependencies (production only) — small layer reused by the final image
# -----------------------------------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# -----------------------------------------------------------------------------
# Builder — full devDependencies for Prisma CLI, generate, and Nest build
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

COPY package.json package-lock.json ./
RUN npm ci

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate
RUN npm run build

# -----------------------------------------------------------------------------
# Production — runtime + compiled app + generated Prisma client only
# -----------------------------------------------------------------------------
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache openssl \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nestjs

COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 3000

CMD ["node", "dist/main.js"]
