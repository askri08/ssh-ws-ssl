FROM ubuntu:22.04

RUN apt update && apt install -y openssh-server nodejs npm

RUN mkdir /var/run/sshd

# user & password
RUN useradd -m t.me/goldenhamzanet
RUN echo "t.me/goldenhamzanet:golden" | chpasswd

COPY server.js /server.js
COPY package.json /package.json

RUN npm install

EXPOSE 22
EXPOSE 8080

CMD service ssh start && node server.js
