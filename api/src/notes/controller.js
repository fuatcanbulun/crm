import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";
import { getPersonDataById } from "../persons/controller.js";

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

const addNote = async (req, res) => {
  const { person_id, note, created_by } = req.body;

  const { first_name, last_name } = await getPersonDataById(person_id);
  const person_name = first_name + " " + last_name;

  pool.query(
    queries.addNote,
    [uuid(), person_id, person_name, note, created_by],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Note added successfully", refresh: true });
    }
  );
};

const removeNoteById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.removeNoteById, [id], (error, results) => {
    if (error) throw error;
    res
      .status(200)
      .json({ message: "Note removed successfully", refresh: true });
  });
};

const updateNote = (req, res) => {
  const { id, person_id, note, created_by } = req.body;

  pool.query(
    queries.updateNote,
    [id, person_id, note, created_by],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Note updated successfully", refresh: true });
    }
  );
};

export const updateNoteByPersonId = async (
  person_id,
  first_name,
  last_name
) => {
  const person_name = first_name + " " + last_name;

  return new Promise((resolve, reject) => {
    pool.query(
      queries.updateNoteByPersonId,
      [person_id, person_name],
      (error, results) => {
        if (error) reject(error);
        resolve(true);
      }
    );
  });
};

export default {
  getNotes,
  getNotesByPersonId,
  addNote,
  removeNoteById,
  updateNote,
};
