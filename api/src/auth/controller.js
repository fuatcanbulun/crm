import pool from "../../db.js";
import queries from "./queries.js";
import bcrypt from "bcrypt";
import { uuid } from "uuidv4";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../../utils/jwt-helpers.js";

const login = (req, res) => {
  const { email, password } = req.body;
  // check if email exists
  pool.query(queries.checkEmailExists, [email], async (error, results) => {
    if (error) throw error;
    if (results.rows.length == 0) {
      res.status(401).json({ error: "Kullanıcı bulunamadı" });
    } else {
      const user = results.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Geçersiz şifre" });
      } else {
        console.log("cookie olustur");
        let tokens = jwtTokens(user); //Gets access and refresh tokens
        res.cookie("refresh_token", tokens.refreshToken, {
          httpOnly: true,
        });
        res.json(tokens);
      }
    }
  });
};

const refreshToken = (req, res) => {
  console.log("req.cookies", req.cookies);
  console.log("Signed Cookies: ", req.signedCookies);

  try {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken === null) return res.sendStatus(401);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens(user);
        res.cookie("refresh_token", tokens.refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        console.log("res", res.cookies);

        return res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const deleteRefreshToken = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "Refresh token deleted." });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default {
  login,
  refreshToken,
  deleteRefreshToken,
};
