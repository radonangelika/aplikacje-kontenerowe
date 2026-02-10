# build React
FROM node:20-alpine AS build
WORKDIR /frontend
COPY package.json /frontend/
RUN npm install
COPY . /frontend/
RUN npm run build

# serve by nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/dist /usr/share/nginx/html
EXPOSE 80
