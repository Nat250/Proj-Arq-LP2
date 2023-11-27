FROM node:alpine
WORKDIR /app
COPY manifest.json .
RUN npm install
COPY . .
CMD ["node", "index"]