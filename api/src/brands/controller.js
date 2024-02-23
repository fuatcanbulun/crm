import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";

const getBrands = (req, res) => {
  pool.query(queries.getBrands, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addBrand = (req, res) => {
  const { label, created_by } = req.body;

  pool.query(
    queries.addBrand,
    [uuid(), label, created_by],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Brand added successfully", refresh: true });
    }
  );
};

const removeBrandById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.removeBrandById, [id], (error, results) => {
    if (error) throw error;
    res
      .status(200)
      .json({ message: "Brand removed successfully", refresh: true });
  });
};

const updateBrand = (req, res) => {
  console.log("req", req);

  const { id, label, created_by } = req.body;

  pool.query(queries.updateBrand, [id, label, created_by], (error, results) => {
    if (error) throw error;
    res
      .status(200)
      .json({ message: "Brand updated successfully", refresh: true });
  });
};

export default {
  getBrands,
  addBrand,
  removeBrandById,
  updateBrand,
};
