import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";
import { getPersonDataById } from "../persons/controller.js";

const getAccountings = (req, res) => {
  pool.query(queries.getAccountings, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getAccountingsByPersonId = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getAccountingsByPersonId, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const item = {
  id: "64d68b61-1841-4b19-a0f5-6b66afdc9f1a",
  accounting_type_id: "61a4bfd9-9027-43b8-8e06-e0e60c31eee3",
  payment_type_id: "1f8cab81-1e9d-494f-a695-c850e4adb157",
  amount: "350",
  currency_type_id: "322866c5-eecb-410d-8c7d-126a1cd22abb",
  accounting_model_id: "d9683b4b-5d25-4a67-9029-233b8479beda",
  related_person_id: "35cb5cb2-ed0f-4fde-8f5d-ba9f852b9a5c",
  created_by: null,
  created_at: null,
  related_person_name: "Fuatcan Bulunq",
  date: "2024-04-30",
};

const getAccountingsByDate = (req, res) => {
  const start_date = req.query.startDate;
  const end_date = req.query.endDate;

  pool.query(
    queries.getAccountingsByDate,
    [start_date, end_date],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const addAccounting = async (req, res) => {
  const {
    accounting_type_id,
    payment_type_id,
    amount,
    currency_type_id,
    accounting_model_id,
    related_person_id,
    created_by,
    date,
  } = req.body;

  const { first_name, last_name } = await getPersonDataById(related_person_id);
  const related_person_name = first_name + " " + last_name;

  pool.query(
    queries.addAccounting,
    [
      uuid(),
      accounting_type_id,
      payment_type_id,
      amount,
      currency_type_id,
      accounting_model_id,
      related_person_id,
      related_person_name,
      created_by,
      date,
    ],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Accounting added successfully", refresh: true });
    }
  );
};

const removeAccountingById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.removeAccountingById, [id], (error, results) => {
    if (error) throw error;
    res
      .status(200)
      .json({ message: "Accounting removed successfully", refresh: true });
  });
};

const updateAccounting = (req, res) => {
  const {
    id,
    accounting_type_id,
    payment_type_id,
    amount,
    currency_type_id,
    accounting_model_id,
    related_person_id,
    created_by,
  } = req.body;

  pool.query(
    queries.updateAccounting,
    [
      id,
      accounting_type_id,
      payment_type_id,
      amount,
      currency_type_id,
      accounting_model_id,
      related_person_id,
      created_by,
    ],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Accounting updated successfully", refresh: true });
    }
  );
};

export const updateAccountingByPersonId = async (
  person_id,
  first_name,
  last_name
) => {
  const related_person_name = first_name + " " + last_name;

  return new Promise((resolve, reject) => {
    pool.query(
      queries.updateAccountingByPersonId,
      [person_id, related_person_name],
      (error, results) => {
        if (error) reject(error);
        resolve(true);
      }
    );
  });
};

export default {
  getAccountings,
  addAccounting,
  getAccountingsByPersonId,
  removeAccountingById,
  updateAccounting,
  getAccountingsByDate,
};
