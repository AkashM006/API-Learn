import express from "express";
import { default as todoRouter } from "./todoRoutes.js";

const router = express.Router();

router.use("/todos", todoRouter);

export default router;
