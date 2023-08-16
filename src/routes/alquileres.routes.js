import { Router } from "express";
import db from "../db/config.js";
const router = Router();
const alquiler = db.collection("alquiler");

// 17. Obtener la cantidad total de alquileres registrados en la base de datos.

router.get("/total", async (req, res) => {
  try {
    const totalALquileres = await alquiler.countDocuments();
    res.json({ status: 200, total_alquileres: totalALquileres });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
});

export { router };
