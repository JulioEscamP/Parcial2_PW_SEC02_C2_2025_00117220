import { Router } from "express";
import { getAllCuentas } from "../controllers/acc.controller.js";

const router = Router();

router.get("/", getAllCuentas);

export default router;