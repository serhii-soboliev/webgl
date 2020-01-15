FROM node:10-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm install express
COPY www ./www
COPY server.js ./
EXPOSE 16000
CMD ["node", "server.js"]

