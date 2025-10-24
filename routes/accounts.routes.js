import { Router } from "express";
import { getAllCuentas, getCuentasBalance } from "../controllers/acc.controller.js";

const router = Router();

router.get("/", getAllCuentas);

router.get("/balance", getCuentasBalance);

export default router;