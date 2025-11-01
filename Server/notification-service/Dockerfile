FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# REST = 4005, gRPC = 50053
EXPOSE 4005
EXPOSE 50053

CMD ["npm", "start"]
