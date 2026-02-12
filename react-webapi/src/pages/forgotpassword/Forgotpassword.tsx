import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'

interface ForgotpasswordForm {
  email: string
}

const Forgotpassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotpasswordForm>()

  const forgotPasswordSubmit: SubmitHandler<ForgotpasswordForm> = (data) => {
    console.log(data)
  }

  return (
    <form
      className='card p-4 col-md-4 my-form'
      onSubmit={handleSubmit(forgotPasswordSubmit)}
    >
      <h3 className='text-center mb-4'>ลืมรหัสผ่าน</h3>

      <div className='mb-3 row'>
        <label htmlFor='email' className='col-md-4 col-form-label'>
          อีเมล์ที่ใช้ลงทะเบียน
        </label>
        <div className='col-md-8'>
          <input
            type='text'
            className='form-control'
            {...register('email', { required: 'กรุณาป้อน Email' })}
          />
          {errors.email && <p className='error'>กรุณาป้อนอีเมล์ก่อน</p>}
        </div>
      </div>

      <div className='mb-3 row'>
        <label htmlFor='submit' className='col-md-4 col-form-label'></label>
        <div className='col-md-8 btn-action'>
          <input
            type='submit'
            className='btn btn-primary'
            name='submit'
            id='submit'
            value='ส่งข้อมูล'
          />
        </div>
      </div>

      <div className='mb-2 row btn-action'>
        <label htmlFor='' className='col-md-4 col-form-label'></label>
        <div className='col-md-8'>
          <Link to='/login'>เข้าสู่ระบบ</Link>
        </div>
      </div>
    </form>
  )
}

export default Forgotpassword
