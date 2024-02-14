import express from "express";
import videosRoutes from "./src/videos/routes.js";
import categoriesRoutes from "./src/categories/routes.js";
import usersRoutes from "./src/users/routes.js";
import onlinesRoutes from "./src/onlines/routes.js";
import favoritesRoutes from "./src/favorites/routes.js";
import authRoutes from "./src/auth/routes.js";

import tokenRoutes from "./src/token/routes.js";
import enumsRoutes from "./src/enums/routes.js";
import personsRoutes from "./src/persons/routes.js";
import appointmentsRoutes from "./src/appointments/routes.js";
import notesRoutes from "./src/notes/routes.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 3001;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ credentials: true, origin: true }));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/lacehair/", (req, res) => {
  res.send("CRM API");
});

app.use("/lacehair/api/v1/videos", videosRoutes);
app.use("/lacehair/api/v1/categories", categoriesRoutes);
app.use("/lacehair/api/v1/users", usersRoutes);
app.use("/lacehair/api/v1/auth", authRoutes);
app.use("/lacehair/api/v1/onlines", onlinesRoutes);
app.use("/lacehair/api/v1/favorites", favoritesRoutes);
app.use("/lacehair/api/v1/token", tokenRoutes);
app.use("/lacehair/api/v1/enums", enumsRoutes);
app.use("/lacehair/api/v1/persons", personsRoutes);
app.use("/lacehair/api/v1/appointments", appointmentsRoutes);
app.use("/lacehair/api/v1/notes", notesRoutes);

app.listen(port, () => console.log(`app listening on ${port}`));
