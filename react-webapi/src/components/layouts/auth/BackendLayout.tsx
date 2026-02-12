import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../../shared/Sidebar'
import Navbar from '../../shared/Navbar'
import Footer from '../../shared/Footer'

const BackendLayout = () => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false) // สร้าง State คุมการซ่อน/แสดง

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  useEffect(() => {
    let pageTitle = 'Smart Stock'
    if (location.pathname === '/backend/dashboard') {
      pageTitle = 'Dashboard'
    } else {
      pageTitle = 'Page Not Found'
    }
    document.title = `${pageTitle} | Smart Stock`
  }, [location.pathname])

  return (
    <>
      {/* แก้ไขบรรทัดนี้: ใช้ Template Literal เพื่อเช็ค State */}
      <div className={`wrapper ${isCollapsed ? 'collapsed' : ''}`}>
        <Sidebar />
        <div className='main'>
          {/* ส่งฟังก์ชัน toggle ไปให้ Navbar */}
          <Navbar toggleSidebar={toggleSidebar} />
          <main className='content'>
            <div className='container-fluid p-0'>
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default BackendLayout
