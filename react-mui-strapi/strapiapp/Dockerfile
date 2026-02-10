# ใช้ Node.js 20 ตามที่โปรเจกต์กำหนด
FROM node:20

# Install dependencies
RUN apt-get update && apt-get install libvips-dev -y

# Node Environment ARG รับมาจากข้างนอก docker compose ไปใส่ใน ENV {NODE_ENV}
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Working Directory
WORKDIR /opt/

# Copy Files Copy เฉพาะไฟล์รายการเพื่อลง Library (Docker จะทำ Caching ตรงนี้ได้)
COPY package.json package-lock.json ./

# ติดตั้ง Dependencies หลัก
RUN npm install

# --- จุดที่ต้องปรับปรุง: ติดตั้ง Client สำหรับ MySQL ---
# สำหรับ Strapi 5 แนะนำให้ใช้ mysql2 เพราะเสถียรและทำงานร่วมกับ Sequelize ได้ดีกว่า
RUN npm install mysql2 --save

# Working Directory สำหรับแอป
WORKDIR /opt/app

# Copy ไฟล์ทั้งหมดที่เหลือ (ซึ่งตอนนี้จะไม่เอา node_modules จากเครื่องจริงไปแล้วเพราะมี .dockerignore)
COPY . .

# Path :strapiapp\Dockerfile
ENV PATH /opt/node_modules/.bin:$PATH

# Build Strapi
RUN npm run build

# Expose port 1337
EXPOSE 1337

# Start Strapi ในโหมดพัฒนา
CMD ["npm", "run", "develop"]