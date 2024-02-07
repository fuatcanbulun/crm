import pool from "../../db.js";
import queries from "./queries.js";
import bcrypt from "bcrypt";
import { uuid } from "uuidv4";

const signUp = (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  // check if email exists
  pool.query(queries.checkEmailExists, [email], async (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      res.send("Email already exists.");
    } else {
      // add user
      const hashedPassword = await bcrypt.hash(password, 10);
      pool.query(
        queries.signUp,
        [uuid(), email, hashedPassword, first_name, last_name],
        (error, results) => {
          if (error) {
            throw error;
          } else {
            res.status(201).json({ message: "User Created Successfully!" });
          }
        }
      );
    }
  });
};

export default {
  signUp,
};
