FROM node:lts-slim AS builder
COPY . /app
WORKDIR /app

ENV NODE_ENV=production
RUN npm install
RUN npm run build

FROM nginx:alpine AS final
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80