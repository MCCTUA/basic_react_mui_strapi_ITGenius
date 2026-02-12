import { Link, useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import Swal from 'sweetalert2'

interface LoginForm {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()

  if (localStorage.getItem('fullname') !== null) {
    navigate('/backend/dashboard')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const loginSubmit: SubmitHandler<LoginForm> = ({ email, password }) => {
    console.log(email, password)
    if (email === 'admin@email.com' && password === '1234') {
      // alert("Login success")
      // 1. ระบุประเภทให้ timerInterval (ReturnType ของ setInterval)
      let timerInterval: ReturnType<typeof setInterval>
      Swal.fire({
        html: 'กำลังเข้าสู่ระบบ <b></b>',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const b = Swal.getHtmlContainer()?.querySelector('b') // 2. ใช้ getHtmlContainer แทน
            if (b) {
              b.textContent = Swal.getTimerLeft()?.toString() || ''
            }
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          // เก็บชื่อผู้ใช้ลง LocalStorage
          localStorage.setItem('fullname', 'สามิตร โกยม')

          // ส่งไปหน้า Backend / Dashboard
          navigate('/backend/dashboard')
        }
      })
    } else {
      // alert("Login fail")
      Swal.fire({
        title: 'มีข้อผิดพลาด!',
        text: 'ข้อมูลเข้าระบบไม่ถูกต้อง',
        icon: 'error',
        confirmButtonText: 'ลองใหม่อีกครั้ง',
        allowOutsideClick: false,
        allowEscapeKey: true,
      })
    }
  }

  return (
    <>
      <div className='bg-light p-5'>
        <h1> เข้าสู่ระบบ </h1>
        <form onSubmit={handleSubmit(loginSubmit)}>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              {...register('email', { required: 'กรุณาป้อน Email' })}
            />
            {errors.email && <p className='error'> กรุณาป้อน Email </p>}
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              {...register('password', { required: 'กรุณาป้อนรหัสผ่าน' })}
            />
            {errors.password && <p className='error'> กรุณาป้อนรหัสผ่าน </p>}
          </div>
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label className='form-check-label' htmlFor='exampleCheck1'>
              Check me out
            </label>
          </div>
          <div className='mb-2 row btn-action>'>
            <div className='col-md-8'>
              <Link to='/register'>ลงทะเบียน</Link>
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
