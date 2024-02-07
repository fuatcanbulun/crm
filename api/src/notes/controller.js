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

export default {
  getNotes,
  getNotesByPersonId,
  addNote,
  removeNoteById,
  updateNote,
};
