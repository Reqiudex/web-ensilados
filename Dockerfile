FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN chmod -R a+rX /usr/share/nginx/html
COPY security-headers.conf /etc/nginx/conf.d/security-headers.conf
COPY nginx-sitio.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
