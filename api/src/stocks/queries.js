const getStocks = "SELECT * FROM stocks";
const addStock =
  "INSERT INTO stocks (id, product_id, amount, created_by, created_at) VALUES ($1, $2, $3, $4, NOW())";
const removeStockById = "DELETE FROM stocks WHERE id = $1";
const updateStock =
  "UPDATE stocks SET product_id = $2, amount = $3, created_by = $4, created_at = NOW() WHERE id = $1";
const getStockByProductId = "SELECT * FROM stocks WHERE product_id = $1";

export default {
  getStocks,
  addStock,
  getStockByProductId,
  removeStockById,
  updateStock,
};
