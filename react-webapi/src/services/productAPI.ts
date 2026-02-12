import http from '../config/_configAxios'

interface productInter {
  id: number | string
  img: string
  name: string
  barcode: string
  price: number
}

// Method Read All Product
const getAllProduct = () => {
  return http.get('products')
}

//Method Read By ID
const getProductById = (id: productInter) => {
  return http.get(`products/${id}`)
}

//Method Add New Product
const addNewProduct = (data: productInter) => {
  return http.post(`products`, data)
}

//Method Update Product
const updateProduct = (id: productInter, data: productInter) => {
  return http.put(`products/${id}`, data)
}

//Method Delete Product
const deleteProduct = (id: productInter) => {
  return http.delete(`products/${id}`)
}

export default {
  getAllProduct,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
}
