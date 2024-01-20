import pool from "../../db.js";
import queries from "./queries.js";
import { uuid } from "uuidv4";

const getFavoritesByUserId = (req, res) => {
  const user_id = req.params.id;
  pool.query(queries.getFavoritesByUserId, [user_id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addFavorite = (req, res) => {
  const { user_id, video_id } = req.body;
  console.log("req.body", req.body);

  pool.query(queries.getFavoriteByVideoId, [video_id], (error, results) => {
    console.log("results", results);
    if (error) throw error;
    if (results.rows.length) {
      pool.query(queries.removeFavorite, [video_id], (error, results) => {
        if (error) throw error;
        // res.status(200).send("Favorite removed successfully");
        res
          .status(200)
          .json({ message: "Favorite removed successfully", refresh: true });
      });
    } else {
      pool.query(
        queries.addFavorite,
        [uuid(), user_id, video_id],
        (error, results) => {
          if (error) throw error;
          res
            .status(200)
            .json({ message: "Favorite added successfully", refresh: true });
        }
      );
    }
  });
};

export default {
  addFavorite,
  getFavoritesByUserId,
};
