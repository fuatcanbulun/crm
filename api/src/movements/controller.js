import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";

const getMovements = (req, res) => {
  pool.query(queries.getMovements, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// const addMovement = (req, res) => {
//   const { movement_type, product_id, amount, created_by } = req.body;

//   pool.query(
//     queries.addMovement,
//     [uuid(), movement_type, product_id, amount, created_by],
//     (error, results) => {
//       if (error) throw error;
//       res
//         .status(200)
//         .json({ message: "Movement added successfully", refresh: true });
//     }
//   );
// };

const removeMovementById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.removeMovementById, [id], (error, results) => {
    if (error) throw error;
    res
      .status(200)
      .json({ message: "Movement removed successfully", refresh: true });
  });
};

// const updateMovement = (req, res) => {
//   console.log("req", req);

//   const { id, movement_type, product_id, amount, created_by } = req.body;

//   pool.query(
//     queries.updateMovement,
//     [id, movement_type, product_id, amount, created_by],
//     (error, results) => {
//       if (error) throw error;
//       res
//         .status(200)
//         .json({ message: "Movement updated successfully", refresh: true });
//     }
//   );
// };

export default {
  getMovements,
  //addMovement,
  removeMovementById,
  //updateMovement,
};
