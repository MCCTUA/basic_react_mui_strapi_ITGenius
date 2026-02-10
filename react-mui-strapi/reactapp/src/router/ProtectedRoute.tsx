import { ReactNode } from "react"
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
    redirectPath?: string
    children: ReactNode
}

const ProtectedRoute = ({
    redirectPath = "/login", // ควรไปปรับเปลี่ยนเป็น /login เพื่อให้ชัดเจน
    children
}: ProtectedRouteProps) => {

    // ดึงค่า Token ภายใน Component เพื่อให้ได้ค่าล่าสุดเสมอ
    const token = localStorage.getItem("token")
    const location = useLocation()

    if (!token) {
        // บันทึกตำแหน่งหน้าที่ผู้ใช้พยายามจะเข้าไว้ (state) 
        // เพื่อให้พอกด Login เสร็จ แล้วเด้งกลับมาหน้าที่เดิมได้
        return <Navigate to={redirectPath} replace state={{ from: location }} />
    }

    return <>{children}</>
}

export default ProtectedRoute