import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";

const getProducts = (req, res) => {
  pool.query(queries.getProducts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addProduct = (req, res) => {
  const { brand_id, product_type, description, created_by } = req.body;

  pool.query(
    queries.addProduct,
    [uuid(), brand_id, product_type, description, created_by],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Product added successfully", refresh: true });
    }
  );
};

const removeProductById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.removeProductById, [id], (error, results) => {
    if (error) throw error;
    res
      .status(200)
      .json({ message: "Product removed successfully", refresh: true });
  });
};

const updateProduct = (req, res) => {
  console.log("req", req);

  const { id, brand_id, product_type, description, created_by } = req.body;

  pool.query(
    queries.updateProduct,
    [id, brand_id, product_type, description, created_by],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ message: "Product updated successfully", refresh: true });
    }
  );
};

export default {
  getProducts,
  addProduct,
  removeProductById,
  updateProduct,
};
