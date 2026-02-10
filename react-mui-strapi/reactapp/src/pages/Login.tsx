import {
    TextField,
    Button,
    Box,
    Container,
    Typography,
    Checkbox,
    FormControlLabel,
    Link
} from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { AxiosError } from 'axios'
import api from "../../services/authUserAPI"

// 1. กำหนดโครงสร้างข้อมูลของ Form
interface LoginForm {
    username: string
    password: string
}

// 2. กำหนดโครงสร้าง Response จาก Strapi 5
interface AuthResponse {
    status: number
    data: {
        jwt: string
        user: {
            id: number
            username: string
            email: string
        }
    }
}

const Login = () => {

    // กำหนด Type ให้กับ useForm โดยใช้ Annotation : แทน Generic
    const navigate = useNavigate() // ประกาศตัวแปร navigate
    const formProps = useForm()
    const { register, handleSubmit, formState: { errors } } = formProps as any // ใช้ workaround เล็กน้อยสำหรับ hook-form หรือระบุ Type ที่ register/onSubmit

    // 3. onSubmit function พร้อมระบุ Generic Type แบบ : SubmitHandler
    const onSubmit: SubmitHandler<LoginForm> = (data: LoginForm) => {

        // Payload สำหรับ Strapi 5
        const authData = {
            identifier: data.username,
            password: data.password
        }

        // เรียก API และระบุ Type ของ response ที่ได้รับ
        api.authLogin(authData).then((response: AuthResponse) => {
            if (response.status === 200) {
                // เก็บ Token ลง Local Storage
                localStorage.setItem("token", response.data.jwt)

                // เปลี่ยนหน้าไปยัง Dashboard
                // หมายเหตุ: ในโปรเจกต์จริงแนะนำใช้ useNavigate() จาก react-router-dom
                // window.location.href = "/backend/dashboard"
                // ใช้ navigate แทน window.location.href
                navigate("/backend/dashboard")
            }
        }).catch((error: AxiosError) => {
            // 2. ระบุ Type เป็น AxiosError
            // ตอนนี้คุณสามารถเข้าถึง error.response ได้โดยไม่มีเส้นแดง
            // และ TypeScript จะรู้ว่ามันมีคุณสมบัติของ Axios ครบถ้วน
            const errorData = error.response?.data as any
            const errorMessage = errorData?.error?.message || "Login failed"

            console.error("Login Error Details:", errorData)
            alert(errorMessage)
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        autoFocus
                        label="Username or Email"
                        type="text"
                        variant="outlined"
                        {...register("username", { required: "Username is required", minLength: { value: 5, message: "Min length is 5" } })}
                        error={!!errors.username}
                        helperText={errors.username?.message as string}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register("password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password?.message as string}
                    />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 3 }}
                    >
                        Submit
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                        <Link href="#" variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                            Forgot password?
                        </Link>
                        <Link href="#" variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                            {"Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default Login