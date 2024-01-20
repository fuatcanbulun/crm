const checkEmailExists = "SELECT * FROM users WHERE email = $1";
const login = "SELECT * FROM users WHERE email = $1";
// const getStudentById = "SELECT * FROM students WHERE id = $1";
// const checkEmailExists = "SELECT * FROM students WHERE email = $1";
// const addStudent =
//   "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";
// const removeStudent = "DELETE FROM students WHERE id = $1";
// const updateStudent = "UPDATE students SET name = $1 WHERE id = $2";

export default {
  login,
  checkEmailExists,
  // getStudentById,
  // checkEmailExists,
  // addStudent,
  // removeStudent,
  // updateStudent,
};
