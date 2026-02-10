import axios from 'axios'

// 1. สร้าง Instance โดยไม่ต้องระบุ Authorization ในตอนแรก
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// 2. ใช้ Interceptors เพื่อดึง Token มาใส่ใน Header ทุกครั้งก่อนยิง API
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 3. (Optional) ดักจับ Error 401 (Unauthorized) เพื่อพาส่งไปหน้า Login
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // localStorage.removeItem('token')
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default instance
