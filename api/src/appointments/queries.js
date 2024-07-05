const getAppointments = "SELECT * FROM appointments";
const getAppointmentsByPersonId =
  "SELECT * FROM appointments WHERE person_id = $1";
const addAppointment =
  "INSERT INTO appointments (id, person_id, person_name, appointment_type, appointment_status_type, date, start_time, end_time, created_by, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())";
const removeAppointmentById = "DELETE FROM appointments WHERE id = $1";
const updateAppointment =
  "UPDATE appointments SET person_id = $2, person_name = $3, appointment_type = $4, appointment_status_type = $5, date = $6, start_time = $7, end_time = $8, created_by = $9, created_at = NOW() WHERE id = $1";

const updateAppointmentByPersonId =
  "UPDATE appointments SET person_name = $2 WHERE person_id = $1";

export default {
  getAppointments,
  getAppointmentsByPersonId,
  addAppointment,
  removeAppointmentById,
  updateAppointment,
  updateAppointmentByPersonId,
};
