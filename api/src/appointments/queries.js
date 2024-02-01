const getAppointments = "SELECT * FROM appointments";
const getAppointmentsByPersonId =
  "SELECT * FROM appointments WHERE person_id = $1";
const addAppointment =
  "INSERT INTO appointments (id, person_id, appointment_type, date, start_time, end_time, created_by, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())";
const removeAppointmentById = "DELETE FROM appointments WHERE id = $1";
const updateAppointment =
  "UPDATE appointments SET person_id = $2, appointment_type = $3, date = $4, start_time = $5, end_time = $6, created_by = $7, created_at = NOW() WHERE id = $1";

export default {
  getAppointments,
  getAppointmentsByPersonId,
  addAppointment,
  removeAppointmentById,
  updateAppointment,
};
