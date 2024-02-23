import pool from "../../db.js";
import queries from "./queries.js";
import movementQueries from "../movements/queries.js";
import { uuid } from "uuidv4";

const getStocks = (req, res) => {
  pool.query(queries.getStocks, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStock = (req, res) => {
  const { product_id, amount, type, created_by } = req.body;

  const movement_type =
    type === "in"
      ? "ce38b2d7-1531-4057-a61b-ef1452452939"
      : "dee037b8-7a22-4b36-8719-89ae2b9622a6";

  pool.query(queries.getStockByProductId, [product_id], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      console.log("stockExists");
      // update stock
      const actualAmmount = parseInt(results.rows[0].amount);
      let newAmmount = actualAmmount;
      if (type === "in") {
        newAmmount = actualAmmount + parseInt(amount);
      } else if (type === "out") {
        newAmmount = actualAmmount - parseInt(amount);
      }
      pool.query(
        queries.updateStock,
        [results.rows[0].id, product_id, newAmmount, created_by],
        (error, results) => {
          if (error) throw error;
          res
            .status(200)
            .json({ message: "Stock updated successfully", refresh: true });
        }
      );
    } else {
      // add stock
      console.log("newStock");
      pool.query(
        queries.addStock,
        [uuid(), product_id, amount, created_by],
        (error, results) => {
          if (error) throw error;
          res
            .status(200)
            .json({ message: "Stock added successfully", refresh: true });
        }
      );
    }
    pool.query(
      movementQueries.addMovement,
      [uuid(), movement_type, product_id, amount, created_by],
      (error, results) => {}
    );
  });
};

const removeStockById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.removeStockById, [id], (error, results) => {
    if (error) throw error;
    res
      .status(200)
      .json({ message: "Stock removed successfully", refresh: true });
  });
};

// const updateStock = (req, res) => {
//   console.log("req", req);

//   const { id, product_id, amount, created_by } = req.body;

//   pool.query(
//     queries.updateStock,
//     [id, product_id, amount, created_by],
//     (error, results) => {
//       if (error) throw error;
//       res
//         .status(200)
//         .json({ message: "Stock updated successfully", refresh: true });
//     }
//   );
// };

export default {
  getStocks,
  addStock,
  removeStockById,
};
