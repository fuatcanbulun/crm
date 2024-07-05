import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";
import { updateAppointmentByPersonId } from "../appointments/controller.js";
import { updateNoteByPersonId } from "../notes/controller.js";
import { updateAccountingByPersonId } from "../accountings/controller.js";

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
      person_type ? person_type : "00000000-0000-0000-0000-000000000000",
      gender_type ? gender_type : "00000000-0000-0000-0000-000000000000",
      date_of_birth,
      city ? city : "00000000-0000-0000-0000-000000000000",
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

  pool.query(
    queries.updatePerson,
    [
      id,
      first_name,
      last_name,
      person_type ? person_type : "00000000-0000-0000-0000-000000000000",
      gender_type ? gender_type : "00000000-0000-0000-0000-000000000000",
      date_of_birth,
      city ? city : "00000000-0000-0000-0000-000000000000",
      phone1,
      phone2,
      email,
      address,
      created_by,
    ],
    async (error, results) => {
      if (error) throw error;
      const appointment_updated = await updateAppointmentByPersonId(
        id,
        first_name,
        last_name
      );
      const note_updated = await updateNoteByPersonId(
        id,
        first_name,
        last_name
      );
      const accounting_updated = await updateAccountingByPersonId(
        id,
        first_name,
        last_name
      );

      res.status(200).json({
        message: "Person updated successfully",
        refresh: true,
        appointment_updated: appointment_updated,
        note_updated: note_updated,
        accounting_updated: accounting_updated,
      });
    }
  );
};

export const getPersonDataById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(queries.getPersonById, [id], (error, results) => {
      if (error) reject(error);
      resolve(results.rows[0]);
    });
  });
};

export default {
  getPersons,
  getPersonById,
  addPerson,
  removePersonById,
  updatePerson,
};
