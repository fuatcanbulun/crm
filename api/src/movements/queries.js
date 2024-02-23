const getMovements = "SELECT * FROM movements";
const addMovement =
  "INSERT INTO movements (id, movement_type, product_id, amount, created_by, created_at) VALUES ($1, $2, $3, $4, $5, NOW())";
const removeMovementById = "DELETE FROM movements WHERE id = $1";
const updateMovement =
  "UPDATE movements SET movement_type = $2, product_id = $3, amount = $4, created_by = $5, created_at = NOW() WHERE id = $1";

export default {
  getMovements,
  addMovement,
  removeMovementById,
  updateMovement,
};
