import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";
import { updateProductByBrandId } from "../products/controller.js";
import { updateStockByBrandId } from "../stocks/controller.js";
import { updateMovementByBrandId } from "../movements/controller.js";

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

  pool.query(
    queries.updateBrand,
    [id, label, created_by],
    async (error, results) => {
      if (error) throw error;
      const product_updated = await updateProductByBrandId(id, label);
      const stock_updated = await updateStockByBrandId(id, label);
      const movement_updated = await updateMovementByBrandId(id, label);
      res.status(200).json({
        message: "Brand updated successfully",
        refresh: true,
        product_updated: product_updated,
        stock_updated: stock_updated,
        movement_updated: movement_updated,
      });
    }
  );
};

export const getBrandDataById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(queries.getBrandById, [id], (error, results) => {
      if (error) reject(error);
      resolve(results.rows[0]);
    });
  });
};

export default {
  getBrands,
  addBrand,
  removeBrandById,
  updateBrand,
};
