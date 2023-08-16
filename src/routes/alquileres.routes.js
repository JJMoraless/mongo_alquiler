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

// 4. Listar todos los alquileres activos junto con los datos de los clientes relacionados.
router.get("/activos", async (req, res) => {
  try {
    const reservasFound = await alquiler
      .aggregate([
        {
          $lookup: {
            from: "cliente",
            localField: "ID_Cliente",
            foreignField: "ID_Cliente",
            as: "cliente",
          },
        },
        {
          $match: {
            Estado: "Activo",
          },
        },
      ])
      .toArray();
    res.json({ status: 200, reservas_activas: reservasFound });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
});

export { router };
