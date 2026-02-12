import { Link, useNavigate } from 'react-router-dom'
// 1. แก้ไข Error: SubmitHandler is a type
import { useForm, type SubmitHandler } from 'react-hook-form'

// interface ของ form input
interface RegisterForm {
  fullname: string
  email: string
  username: string
  password: string
}

const Register = () => {
  // การเรียกใช้งาน React Hook Form
  // 2. กำหนด Type ให้ useForm เพื่อให้ register และ errors มี Type ที่ถูกต้อง
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>()

  const navigate = useNavigate()

  // 3. แก้ไข Error: Type mismatch ใน data
  const registerSubmit: SubmitHandler<RegisterForm> = (data, e) => {
    console.log(data, e)
    localStorage.setItem('fullname', data.fullname)
    //reset fields input
    reset()
    // ส่งไปหน้า Backend / Dashboard
    navigate('/backend/dashboard')
  }

  return (
    <>
      <form className='my-form' onSubmit={handleSubmit(registerSubmit)}>
        <h3 className='text-center mb-4'>ลงทะเบียน</h3>

        {/* ชื่อ-สกุล */}
        <div className='mb-3 row'>
          <label htmlFor='fullname' className='col-md-4 col-form-label'>
            ชื่อ-สกุล
          </label>
          <div className='col-md-8'>
            <input
              type='text'
              className='form-control'
              {...register('fullname', { required: 'กรุณาป้อนชื่อก่อน' })}
            />
            {errors.fullname && (
              <p className='text-danger small'>{errors.fullname.message}</p>
            )}
          </div>
        </div>

        {/* อีเมล */}
        <div className='mb-3 row'>
          <label htmlFor='email' className='col-md-4 col-form-label'>
            อีเมล
          </label>
          <div className='col-md-8'>
            <input
              type='email'
              className='form-control'
              {...register('email', { required: 'กรุณาป้อนอีเมลก่อน' })}
            />
            {errors.email && (
              <p className='text-danger small'>{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* ชื่อผู้ใช้ */}
        <div className='mb-3 row'>
          <label htmlFor='username' className='col-md-4 col-form-label'>
            ชื่อผู้ใช้
          </label>
          <div className='col-md-8'>
            <input
              type='text'
              className='form-control'
              {...register('username', { required: 'กรุณาป้อนชื่อผู้ใช้ก่อน' })}
            />
            {errors.username && (
              <p className='text-danger small'>{errors.username.message}</p>
            )}
          </div>
        </div>

        {/* รหัสผ่าน (เอา Comment ออกและจัดลำดับ Tag ให้ดี) */}
        <div className='mb-3 row'>
          <label htmlFor='password' className='col-md-4 col-form-label'>
            รหัสผ่าน
          </label>
          <div className='col-md-8'>
            <input
              type='password'
              className='form-control'
              {...register('password', { required: 'กรุณาป้อนรหัสผ่านก่อน' })}
            />
            {errors.password && (
              <p className='text-danger small'>{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* ปุ่มดำเนินการ */}
        <div className='mb-3 row'>
          <div className='col-md-8 offset-md-4'>
            <button type='submit' className='btn btn-primary'>
              ลงทะเบียน
            </button>
            &nbsp;&nbsp;
            <button type='reset' className='btn btn-danger'>
              ล้างข้อมูล
            </button>
          </div>
        </div>

        <div className='text-center mt-3'>
          <Link to='/login'>เข้าสู่ระบบ</Link>
        </div>
      </form>
    </>
  )
}

export default Register
