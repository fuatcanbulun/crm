import pool from "../../db.js";
import queries from "./queries.js";

const getCategories = (req, res) => {
  pool.query(queries.getCategories, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export default {
  getCategories,
};
