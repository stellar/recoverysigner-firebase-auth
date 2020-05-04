FROM ubuntu:16.04 as build

RUN apt-get update && apt-get install -y curl git apt-transport-https && \
    curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    echo "deb https://deb.nodesource.com/node_10.x xenial main" | tee /etc/apt/sources.list.d/nodesource.list && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y nodejs yarn

ADD . /app/src

WORKDIR /app/src

RUN yarn install
RUN yarn build

FROM nginx:1.17

COPY --from=build /app/src/docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/src/build/ /usr/share/nginx/html/

# Reset env-config.js
RUN rm -rf /usr/share/nginx/html/config/env-config.js
