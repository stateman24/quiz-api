FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY . .

RUN npm install -g typescript
RUN npm run build --if-present

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install 

COPY --from=builder /app/dist ./dist

CMD ["npm", "start"]
EXPOSE 8500
