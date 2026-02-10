import { defineConfig } from 'vite'
// ตอนสร้างเราใช้ swc ด้วยดังนั้นต้อง import ตัวนี้ (มี swc ด้านท้าย)
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // กำหนด port ให้ตรงกับที่ระบุใน Dockerfile (5173)
    port: 5173,
    // จำเป็นต้องตั้ง host เป็น true เพื่อให้ Docker mapping พอร์ตออกมาได้
    host: true,
    // กรณีใช้ร่วมกับ Nginx หรือต้องการตรวจสอบผ่าน Network
    strictPort: true,
    watch: {
      // ใช้ polling กรณีรันบน Windows (WSL2) หรือ Docker
      // เพื่อให้ Hot Module Replacement (HMR) ทำงานได้ลื่นไหล
      usePolling: true,
    },
  },
  preview: {
    // สำหรับคำสั่ง pnpm preview (ถ้าใช้ใน Docker Production)
    port: 5173,
    host: true,
    strictPort: true,
  },
})
