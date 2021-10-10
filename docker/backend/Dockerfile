FROM node:16.3.0-alpine3.11

RUN apk add --no-cache --virtual \
  build-deps \
  g++ \
  make \
  perl-dev \
  tzdata openssh \
  curl \
  perl-dbd-pg \
  postgresql-client

RUN cpan App::cpanminus
RUN cpanm App::Sqitch --no-wget --notest --quiet
RUN rm -rf /root/.cpan

ENV TZ UTC

RUN npm install -g nodemon @roarr/cli

WORKDIR /
COPY ../../package.json .
RUN npm install

WORKDIR /backend
COPY ../../ .

CMD ["npm", "run", "start:dev"]
