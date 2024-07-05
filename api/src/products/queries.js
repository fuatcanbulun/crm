const getProducts = "SELECT * FROM products";
const getProductById = "SELECT * FROM products where id = $1";
const addProduct =
  "INSERT INTO products (id, brand_id, brand_name, product_type, description, created_by, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())";
const removeProductById = "DELETE FROM products WHERE id = $1";
const updateProduct =
  "UPDATE products SET brand_id = $2, brand_name = $3, product_type = $4, description = $5, created_by = $6, created_at = NOW() WHERE id = $1";

const updateProductByBrandId =
  "UPDATE products SET brand_name = $2 WHERE brand_id = $1";

export default {
  getProducts,
  addProduct,
  removeProductById,
  updateProduct,
  updateProductByBrandId,
  getProductById,
};
