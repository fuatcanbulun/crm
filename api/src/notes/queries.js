const getNotes = "SELECT * FROM notes";
// const getPersonById = "SELECT * FROM persons WHERE id = $1";
const addNote =
  "INSERT INTO notes (id, person_id, note, created_by, created_at) VALUES ($1, $2, $3, $4, NOW())";
// const removePersonById = "DELETE FROM persons WHERE id = $1";
// const updatePerson =
//   "UPDATE persons SET first_name = $2, last_name = $3, person_type = $4, gender_type = $5, date_of_birth = $6, city = $7, phone1 = $8, phone2 = $9, email = $10, address = $11, created_by = $12, created_at = $13 WHERE id = $1";
const getNotesByPersonId = "SELECT * FROM notes WHERE person_id = $1";

export default {
  getNotes,
  addNote,
  getNotesByPersonId,
  // getPersonById,
  // addPerson,
  // removePersonById,
  // updatePerson,
};
