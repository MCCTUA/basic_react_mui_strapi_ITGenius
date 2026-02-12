import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layouts/auth/AuthLayout'
import BackendLayout from './components/layouts/auth/BackendLayout'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import PageNotFound from './pages/pagenotfound/PageNotFound'
import Dashboard from './pages/backend/dashboard/Dashboard'
import Product from './pages/backend/product/Product'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Frontend */}
      <Route element={<AuthLayout />}>
        {/* Frontend: path ย่อยจะไปแสดงผลที่จุด <Outlet /> ใน AuthLayout */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
      </Route>

      {/* Backend */}
      <Route path='/backend' element={<BackendLayout />}>
        {/* index หมายถึงหน้าแรกของกลุ่มนี้ (คือ /backend) */}
        <Route index element={<Dashboard />} />
        {/* path ย่อยจะต่อท้ายอัตโนมัติ กลายเป็น /backend/dashboard */}
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='products' element={<Product />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes
