import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const AuthLayout = () => {
  const location = useLocation()

  useEffect(() => {
    let pageTitle = 'Smart Stock'
    if (location.pathname === '/login' || location.pathname === '/') {
      pageTitle = 'เข้าสู่ระบบ'
    } else if (location.pathname === '/register') {
      pageTitle = 'ลงทะเบียน'
    } else {
      pageTitle = 'Page Not Found'
    }
    document.title = `${pageTitle} | Smart Stock`
  }, [location.pathname])

  return (
    <>
      <div className='bg-info'>
        {/* ใช้ d-flex และ vh-100 ที่ชั้นนี้ชั้นเดียวพอครับ */}
        <div className='d-flex align-items-center justify-content-center vh-100'>
          <div className='container'>
            <div className='row justify-content-center'>
              {/* ปรับขนาด col ให้พอดี (md-6 หรือ lg-5 จะกำลังสวยสำหรับฟอร์มลงทะเบียน) */}
              <div className='col-11 col-md-8 col-lg-6 col-xl-4'>
                <div className='card shadow-lg border-0'>
                  <div className='card-body p-4'>
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
