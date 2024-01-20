import pool from "../../db.js";
import queries from "./queries.js";

const getVideos = (req, res) => {
  pool.query(queries.getVideos, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getVideoById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getVideoById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  });
};

export default {
  getVideos,
  getVideoById,
};
