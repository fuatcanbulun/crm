const checkEmailExists = "SELECT * FROM users WHERE email = $1";
const signUp =
  "INSERT INTO users (id, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *";

// const checkEmailExists = "SELECT * FROM students WHERE email = $1";
// const addStudent =
//   "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";
// const removeStudent = "DELETE FROM students WHERE id = $1";
// const updateStudent = "UPDATE students SET name = $1 WHERE id = $2";

export default {
  signUp,
  checkEmailExists,
  // getStudentById,
  // checkEmailExists,
  // addStudent,
  // removeStudent,
  // updateStudent,
};
