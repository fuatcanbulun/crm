const getPersons = "SELECT * FROM persons";
const getPersonById = "SELECT * FROM persons WHERE id = $1";
const addPerson =
  "INSERT INTO persons (id, first_name, last_name, person_type, gender_type, date_of_birth, city, phone1, phone2, email, address, created_by, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";
const removePersonById = "DELETE FROM persons WHERE id = $1";
const updatePerson =
  "UPDATE persons SET first_name = $2, last_name = $3, person_type = $4, gender_type = $5, date_of_birth = $6, city = $7, phone1 = $8, phone2 = $9, email = $10, address = $11, created_by = $12, created_at = $13 WHERE id = $1";

export default {
  getPersons,
  getPersonById,
  addPerson,
  removePersonById,
  updatePerson,
};
