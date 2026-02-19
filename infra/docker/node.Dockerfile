FROM node:22-alpine as builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM nginx:stable-alpine3.23-slim as server

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/ /usr/share/nginx/html/

RUN nginx -t

CMD ["nginx", "-g", "daemon off;"]
