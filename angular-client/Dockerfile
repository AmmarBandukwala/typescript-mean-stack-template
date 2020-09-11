# First Stage - Build Source into Distributable
FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Second Stage - Take Contents of Dist and Copy to Web Server as Static Files to Serve
FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/angular-client/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80