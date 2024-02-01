import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";

const getPersons = (req, res) => {
  pool.query(queries.getPersons, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getPersonById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getPersonById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  });
};

const addPerson = (req, res) => {
  const {
    first_name,
    last_name,
    person_type,
    gender_type,
    date_of_birth,
    city,
    phone1,
    phone2,
    email,
    address,
    created_by,
  } = req.body;

  pool.query(
    queries.addPerson,
    [
      uuid(),
      first_name,
      last_name,
      person_type,
      gender_type,
      date_of_birth,
      city,
      phone1,
      phone2,
      email,
      address,
      created_by,
    ],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Person added successfully", refresh: true });
    }
  );
};

const removePersonById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.removePersonById, [id], (error, results) => {
    if (error) throw error;
    res
      .status(200)
      .json({ message: "Person removed successfully", refresh: true });
  });
};

const updatePerson = (req, res) => {
  const {
    id,
    first_name,
    last_name,
    person_type,
    gender_type,
    date_of_birth,
    city,
    phone1,
    phone2,
    email,
    address,
    created_by,
  } = req.body;

  const createdAtDate = new Date();
  const formattedCreatedAt = createdAtDate.toISOString();

  pool.query(
    queries.updatePerson,
    [
      id,
      first_name,
      last_name,
      person_type,
      gender_type,
      date_of_birth,
      city,
      phone1,
      phone2,
      email,
      address,
      created_by,
      formattedCreatedAt,
    ],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Person updated successfully", refresh: true });
    }
  );
};

export default {
  getPersons,
  getPersonById,
  addPerson,
  removePersonById,
  updatePerson,
};
