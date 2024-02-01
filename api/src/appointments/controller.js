import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";

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

const addAppointment = (req, res) => {
  const {
    person_id,
    appointment_type,
    date,
    start_time,
    end_time,
    created_by,
  } = req.body;

  pool.query(
    queries.addAppointment,
    [
      uuid(),
      person_id,
      appointment_type,
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

const updateAppointment = (req, res) => {
  console.log("req", req);

  const {
    id,
    person_id,
    appointment_type,
    date,
    start_time,
    end_time,
    created_by,
  } = req.body;

  pool.query(
    queries.updateAppointment,
    [id, person_id, appointment_type, date, start_time, end_time, created_by],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Appointment updated successfully", refresh: true });
    }
  );
};

export default {
  getAppointments,
  addAppointment,
  getAppointmentsByPersonId,
  removeAppointmentById,
  updateAppointment,
};
