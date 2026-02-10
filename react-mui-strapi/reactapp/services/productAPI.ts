import http from './configAxios'

// 1. กำหนด Interface สำหรับข้อมูล Product (ปรับตามฟิลด์ของคุณ)
interface ProductResponse {
    data: {
        id: number;
        documentId: string;
        title: string;
        slug: string;
        description: string;
    }[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// 2. ปรับปรุงฟังก์ชันดึงข้อมูล
const getAllProducts = (): Promise<ProductResponse> => {
    // ใน Strapi 5 เรามักจะใส่ความต้องการเพิ่ม เช่น sort หรือสถานะ
    return http.get('/products?populate=*&status=published')
        .then(response => response.data) // ดึงเฉพาะส่วน data ออกมาเลย
        .catch(error => {
            console.error("Fetch Products Error:", error);
            throw error;
        });
}

export default { getAllProducts }