FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# REST = 5005, gRPC = 50052
EXPOSE 5005
EXPOSE 50052

CMD ["npm", "start"]
