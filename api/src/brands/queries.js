const getBrands = "SELECT * FROM brands";
const getBrandById = "SELECT * FROM brands WHERE id = $1";
const addBrand =
  "INSERT INTO brands (id, label, created_by, created_at) VALUES ($1, $2, $3, NOW())";
const removeBrandById = "DELETE FROM brands WHERE id = $1";
const updateBrand =
  "UPDATE brands SET label = $2, created_by = $3, created_at = NOW() WHERE id = $1";

export default {
  getBrands,
  addBrand,
  removeBrandById,
  updateBrand,
  getBrandById,
};
