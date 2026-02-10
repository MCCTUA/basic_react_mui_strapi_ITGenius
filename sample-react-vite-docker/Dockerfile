# Pull the base image ใช้ Node 22 ตามที่เลือกไว้ใน Volta
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/app

## Copy app dependencies to container
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy code from host to container
COPY . .

# เปิดพอร์ต 5173 ตาม Vite มาตรฐาน
EXPOSE 5173

# Deploy app for local development
CMD [ "pnpm", "run", "dev" ]