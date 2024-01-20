import pool from "../../db.js";
import queries from "./queries.js";

const getOnlines = (req, res) => {
  pool.query(queries.getOnlines, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export default {
  getOnlines,
};
