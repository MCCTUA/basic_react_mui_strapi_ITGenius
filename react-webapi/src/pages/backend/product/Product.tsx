import { useState, useEffect } from 'react'
import api from '../../../services/productAPI'

const Product = () => {
  interface ProductItem {
    id: number | string
    product_name: string
    product_barcode: string
    product_price: number | string
    product_image: string
  }
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ดึงข้อมูลสินค้า
    api
      .getAllProduct()
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <>
      <h1 className='h3 mb-3'>Product List</h1>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              {loading ? (
                <div className='text-center'>กำลังโหลดข้อมูล...</div>
              ) : (
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>Img</th>
                      <th>Name</th>
                      <th>Barcode</th>
                      <th className='text-right'>Price</th>
                      <th style={{ width: '130px', textAlign: 'right' }}>
                        Manage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product: ProductItem) => (
                        // ✅ ใช้ product.id หรือรหัสสินค้าแทน index
                        <tr key={product.id}>
                          <td>
                            <img
                              src={product.product_image}
                              height='50'
                              className='rounded'
                              alt={product.product_name}
                            />
                          </td>
                          <td>{product.product_name}</td>
                          <td>
                            <code>{product.product_barcode}</code>
                          </td>
                          <td className='text-right'>
                            {/* จัดรูปแบบตัวเลขให้มีคอมมา */}
                            {Number(product.product_price).toLocaleString()}
                          </td>
                          <td className='text-right'>
                            <button className='btn btn-sm btn-warning'>
                              Edit
                            </button>
                            &nbsp;
                            <button className='btn btn-sm btn-danger'>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className='text-center'>
                          ไม่พบข้อมูลสินค้า
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
