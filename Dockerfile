# build environment
FROM node:20 as builder
ARG ENV
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent --legacy-peer-deps
COPY . /usr/src/app
RUN if [ "$ENV" = "DEV" ]; then npm run build:dev; else npm run build; fi

# production environment
FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY .env .
COPY .env.development .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN mkdir -p -m 777 /logs \
    && chmod -R 777 /var/cache/nginx \
    && chmod -R 777 /usr/share/nginx

EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c",  "nginx -g \"daemon off;\""]
