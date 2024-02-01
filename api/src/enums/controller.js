import pool from "../../db.js";
import queries from "./queries.js";

const getEnumPersonTypes = (req, res) => {
  pool.query(queries.getEnumPersonTypes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getEnumGenderTypes = (req, res) => {
  pool.query(queries.getEnumGenderTypes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getEnumCities = (req, res) => {
  pool.query(queries.getEnumCities, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getEnumAppointmentTypes = (req, res) => {
  pool.query(queries.getEnumAppointmentTypes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getEnumAccountingTypes = (req, res) => {
  pool.query(queries.getEnumAccountingTypes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getEnumIncomeTypes = (req, res) => {
  pool.query(queries.getEnumIncomeTypes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getEnumExpenseTypes = (req, res) => {
  pool.query(queries.getEnumExpenseTypes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getEnumPaymentTypes = (req, res) => {
  pool.query(queries.getEnumPaymentTypes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getEnumCurrencyTypes = (req, res) => {
  pool.query(queries.getEnumCurrencyTypes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getEnumStockMovementTypes = (req, res) => {
  pool.query(queries.getEnumStockMovementTypes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export default {
  getEnumPersonTypes,
  getEnumGenderTypes,
  getEnumCities,
  getEnumAppointmentTypes,
  getEnumAccountingTypes,
  getEnumIncomeTypes,
  getEnumExpenseTypes,
  getEnumPaymentTypes,
  getEnumCurrencyTypes,
  getEnumStockMovementTypes,
};
