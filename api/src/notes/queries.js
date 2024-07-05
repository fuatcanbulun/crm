const getNotes = "SELECT * FROM notes";
// const getPersonById = "SELECT * FROM persons WHERE id = $1";
const addNote =
  "INSERT INTO notes (id, person_id, person_name, note, created_by, created_at) VALUES ($1, $2, $3, $4, $5, NOW())";
const removeNoteById = "DELETE FROM notes WHERE id = $1";
const updateNote =
  "UPDATE notes SET person_id = $2, note = $3, created_by = $4, created_at = NOW() WHERE id = $1";
const getNotesByPersonId = "SELECT * FROM notes WHERE person_id = $1";

const updateNoteByPersonId =
  "UPDATE notes SET person_name = $2 WHERE person_id = $1";

export default {
  getNotes,
  addNote,
  getNotesByPersonId,
  removeNoteById,
  updateNote,
  updateNoteByPersonId,
};
