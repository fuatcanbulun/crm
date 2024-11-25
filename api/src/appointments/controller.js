import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";
import { getPersonDataById } from "../persons/controller.js";

const getAppointments = (req, res) => {
  pool.query(queries.getAppointments, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getAppointmentsByPersonId = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getAppointmentsByPersonId, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addAppointment = async (req, res) => {
  const {
    person_id,
    appointment_type,
    appointment_status_type,
    date,
    start_time,
    end_time,
    created_by,
  } = req.body;

  const { first_name, last_name } = await getPersonDataById(person_id);
  const person_name = first_name + " " + last_name;

  pool.query(
    queries.addAppointment,
    [
      uuid(),
      person_id,
      person_name,
      appointment_type,
      appointment_status_type,
      date,
      start_time,
      end_time,
      created_by,
    ],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Appointment added successfully", refresh: true });
    }
  );
};

const removeAppointmentById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.removeAppointmentById, [id], (error, results) => {
    if (error) throw error;
    res
      .status(200)
      .json({ message: "Appointment removed successfully", refresh: true });
  });
};

const updateAppointment = async (req, res) => {
  console.log("req", req);

  const {
    id,
    person_id,
    appointment_type,
    appointment_status_type,
    date,
    start_time,
    end_time,
    created_by,
  } = req.body;

  const { first_name, last_name } = await getPersonDataById(person_id);
  const person_name = first_name + " " + last_name;

  pool.query(
    queries.updateAppointment,
    [
      id,
      person_id,
      person_name,
      appointment_type,
      appointment_status_type,
      date,
      start_time,
      end_time,
      created_by,
    ],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Appointment updated successfully", refresh: true });
    }
  );
};

export const updateAppointmentByPersonId = async (
  person_id,
  first_name,
  last_name
) => {
  const person_name = first_name + " " + last_name;

  return new Promise((resolve, reject) => {
    pool.query(
      queries.updateAppointmentByPersonId,
      [person_id, person_name],
      (error, results) => {
        if (error) reject(error);
        resolve(true);
      }
    );
  });
};

export default {
  getAppointments,
  addAppointment,
  getAppointmentsByPersonId,
  removeAppointmentById,
  updateAppointment,
};
