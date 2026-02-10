import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import type { ReactNode } from 'react' // 1. Import ReactNode เข้ามา

// 2. กำหนดโครงสร้างของ Props
interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}
export default MainLayout