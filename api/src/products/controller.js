import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";
import { getBrandDataById } from "../brands/controller.js";
import { updateStockByProductId } from "../stocks/controller.js";
import { updateMovementByProductId } from "../movements/controller.js";

const getProducts = (req, res) => {
  pool.query(queries.getProducts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addProduct = async (req, res) => {
  const { brand_id, product_type, description, created_by } = req.body;

  const { label } = await getBrandDataById(brand_id);

  pool.query(
    queries.addProduct,
    [uuid(), brand_id, label, product_type, description, created_by],
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

const updateProduct = async (req, res) => {
  console.log("req", req);

  const { id, brand_id, product_type, description, created_by } = req.body;

  const { label } = await getBrandDataById(brand_id);

  pool.query(
    queries.updateProduct,
    [id, brand_id, label, product_type, description, created_by],
    async (error, results) => {
      if (error) throw error;
      const stock_updated = await updateStockByProductId(id, description);
      const movement_updated = await updateMovementByProductId(id, description);
      res.status(200).json({
        message: "Product updated successfully",
        refresh: true,
        stock_updated: stock_updated,
        movement_updated: movement_updated,
      });
    }
  );
};

export const updateProductByBrandId = async (brand_id, brand_name) => {
  return new Promise((resolve, reject) => {
    pool.query(
      queries.updateProductByBrandId,
      [brand_id, brand_name],
      (error, results) => {
        if (error) reject(error);
        resolve(true);
      }
    );
  });
};

export const getProductDataById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(queries.getProductById, [id], (error, results) => {
      if (error) reject(error);
      resolve(results.rows[0]);
    });
  });
};

export default {
  getProducts,
  addProduct,
  removeProductById,
  updateProduct,
};
