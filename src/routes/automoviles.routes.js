import { Router } from "express";
import db from "../db/config.js";
const automovil = db.collection("automovil");
const router = Router();

// 15. Listar todos los automóviles ordenados por marca y modelo.
router.get("/", async (req, res) => {
  try {
    const autosFound = await automovil.find().sort({ Marca: 1 }).toArray();
    res.json({ status: 200, automoviles: autosFound });
  } catch (error) {
    res.status(500)({ status: 500, error });
  }
});

export { router };
