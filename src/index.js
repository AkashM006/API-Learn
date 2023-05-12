import express from "express";
import dotenv from "dotenv";
import { default as v1Router } from "./v1/routes/index.js";
import swaggerDocs from "./swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);

  swaggerDocs(app, PORT);
});
