const getStocks = "SELECT * FROM stocks";
const addStock =
  "INSERT INTO stocks (id, product_id, product_description, product_brand_id, product_brand_name, amount, created_by, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())";
const removeStockById = "DELETE FROM stocks WHERE id = $1";
const updateStock =
  "UPDATE stocks SET product_id = $2, product_description = $3, product_brand_id = $4, product_brand_name = $5, amount = $6, created_by = $7, created_at = NOW() WHERE id = $1";
const getStockByProductId = "SELECT * FROM stocks WHERE product_id = $1";
const updateStockByBrandId =
  "UPDATE stocks SET product_brand_name = $2 WHERE product_brand_id = $1";
const updateStockByProductId =
  "UPDATE stocks SET product_description = $2 WHERE product_id = $1";

export default {
  getStocks,
  addStock,
  getStockByProductId,
  removeStockById,
  updateStock,
  updateStockByBrandId,
  updateStockByProductId,
};
