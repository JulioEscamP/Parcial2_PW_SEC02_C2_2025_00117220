import { Router } from "express";
import { getCuentaById } from "../controllers/acc.controller.js";

const router = Router();

router.get("/:id", getCuentaById);

export default router;