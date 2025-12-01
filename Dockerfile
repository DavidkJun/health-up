FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY prisma ./prisma
COPY ./src ./src

RUN npx prisma generate
RUN npm run build

CMD ["node", "dist/main.js"]