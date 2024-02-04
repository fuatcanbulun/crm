import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";

const getNotes = (req, res) => {
  pool.query(queries.getNotes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getNotesByPersonId = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getNotesByPersonId, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addNote = (req, res) => {
  const { person_id, note, created_by } = req.body;

  pool.query(
    queries.addNote,
    [uuid(), person_id, note, created_by],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Note added successfully", refresh: true });
    }
  );
};

// const removePersonById = (req, res) => {
//   const id = req.params.id;
//   pool.query(queries.removePersonById, [id], (error, results) => {
//     if (error) throw error;
//     res
//       .status(200)
//       .json({ message: "Person removed successfully", refresh: true });
//   });
// };

// const updatePerson = (req, res) => {
//   const {
//     id,
//     first_name,
//     last_name,
//     person_type,
//     gender_type,
//     date_of_birth,
//     city,
//     phone1,
//     phone2,
//     email,
//     address,
//     created_by,
//   } = req.body;

//   const createdAtDate = new Date();
//   const formattedCreatedAt = createdAtDate.toISOString();

//   pool.query(
//     queries.updatePerson,
//     [
//       id,
//       first_name,
//       last_name,
//       person_type,
//       gender_type,
//       date_of_birth,
//       city,
//       phone1,
//       phone2,
//       email,
//       address,
//       created_by,
//       formattedCreatedAt,
//     ],
//     (error, results) => {
//       if (error) throw error;
//       res
//         .status(200)
//         .json({ message: "Person updated successfully", refresh: true });
//     }
//   );
// };

export default {
  getNotes,
  getNotesByPersonId,
  addNote,
  // removePersonById,
  // updatePerson,
};
