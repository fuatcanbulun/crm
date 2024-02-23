const getProducts = "SELECT * FROM products";
const addProduct =
  "INSERT INTO products (id, brand_id, product_type, description, created_by, created_at) VALUES ($1, $2, $3, $4, $5, NOW())";
const removeProductById = "DELETE FROM products WHERE id = $1";
const updateProduct =
  "UPDATE products SET brand_id = $2, product_type = $3, description = $4, created_by = $5, created_at = NOW() WHERE id = $1";

export default {
  getProducts,
  addProduct,
  removeProductById,
  updateProduct,
};
