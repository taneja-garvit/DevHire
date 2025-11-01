FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# REST = 5004, gRPC = 50051
EXPOSE 5004
EXPOSE 50051

CMD ["npm", "start"]
