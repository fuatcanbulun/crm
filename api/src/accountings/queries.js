const getAccountings = "SELECT * FROM accountings";
const getAccountingsByPersonId =
  "SELECT * FROM accountings WHERE related_person_id = $1";
const addAccounting =
  "INSERT INTO accountings (id, accounting_type_id, payment_type_id, amount, currency_type_id, accounting_model_id, related_person_id, related_person_name, created_by, created_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())";
const removeAccountingById = "DELETE FROM accountings WHERE id = $1";
const updateAccounting =
  "UPDATE accountings SET accounting_type_id = $2, payment_type_id = $3, amount = $4, currency_type_id = $5, accounting_model_id = $6, related_person_id = $7, created_by = $8, created_at = NOW() WHERE id = $1";
const updateAccountingByPersonId =
  "UPDATE accountings SET related_person_name = $2 WHERE related_person_id = $1";
const getAccountingsByDate =
  "SELECT * FROM accountings WHERE date BETWEEN $1 AND $2";

export default {
  getAccountings,
  getAccountingsByPersonId,
  addAccounting,
  removeAccountingById,
  updateAccounting,
  updateAccountingByPersonId,
  getAccountingsByDate,
};
