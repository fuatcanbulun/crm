const getMovements = "SELECT * FROM movements";
const addMovement =
  "INSERT INTO movements (id, movement_type, product_id, product_description, product_brand_id, product_brand_name, amount, created_by, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())";
const removeMovementById = "DELETE FROM movements WHERE id = $1";
const updateMovement =
  "UPDATE movements SET movement_type = $2, product_id = $3, product_description = $4, product_brand_id = $5, product_brand_name = $6, amount = $7, created_by = $8, created_at = NOW() WHERE id = $1";
const updateMovementByBrandId =
  "UPDATE movements SET product_brand_name = $2 WHERE product_brand_id = $1";
const updateMovementByProductId =
  "UPDATE movements SET product_description = $2 WHERE product_id = $1";

export default {
  getMovements,
  addMovement,
  removeMovementById,
  updateMovement,
  updateMovementByBrandId,
  updateMovementByProductId,
};
