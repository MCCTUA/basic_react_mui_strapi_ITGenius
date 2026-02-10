import { PRODUCT_TITLE, SYSTEM_NAME } from "../config/constants"
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import api from "../../services/productAPI"
import { useState, useEffect } from "react"

interface ProductItem {
    id: number
    documentId: string
    title: string
    slug: string
    description: string
    price?: number // เพิ่มฟิลด์อื่นๆ ที่คุณมีใน Strapi
    qty?: number
    image?: {
        url: string
    }
}

const Product = () => {

    // Create state for products
    const [products, setProducts] = useState<ProductItem[]>([])

    // Read all products
    const readAllProducts = () => {
        api.getAllProducts().then(response => {
            setProducts(response.data)
        })
    }

    // initial load with useEffect
    useEffect(() => {
        readAllProducts()
    }, [])

    console.log(products)

    // Set title
    document.title = PRODUCT_TITLE + ' | ' + SYSTEM_NAME

    return (
        <>
            <h1>Products</h1>
            <Box sx={styles.columnsContainer}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Create</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product: any) => (
                                <TableRow key={product.documentId || product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    {/* Strapi 5: เรียก product.title ได้เลย ไม่ต้องผ่าน attributes */}
                                    <TableCell>{product.title}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        {product.image ? (
                                            <img
                                                // 1. ตรวจสอบว่า VITE_BASE_IMAGE_URL ของคุณคือ http://localhost:1337 (ไม่มี /api ต่อท้าย)
                                                // 2. Strapi 5 มักจะเก็บ url เข้าถึงตัวแรกของ Array [0] แล้วตามด้วย .url
                                                src={`${import.meta.env.VITE_BASE_IMAGE_URL}${product.image[0].url}`}
                                                alt={product.title}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px',
                                                    border: '1px solid #ddd'
                                                }}
                                            />
                                        ) : (
                                            // กรณีไม่มีรูปภาพให้แสดงเป็นกล่องว่าง หรือ Icon แทน
                                            <Box sx={{ width: 50, height: 50, bgcolor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                                                No Img
                                            </Box>
                                        )}
                                    </TableCell>
                                    <TableCell>{product.qty}</TableCell>
                                    <TableCell>{new Date(product.publishedAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="warning">Edit</Button>&nbsp;
                                        <Button variant="contained" color="error">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default Product

const styles = {
    columnsContainer: {
        columns: '280px 1',
        maxWidth: 1400
    },
}