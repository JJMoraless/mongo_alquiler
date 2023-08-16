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

// 20. Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.
router.get("/fecha_inicio", async (req, res) => {
  try {
    const alquileresFound = await alquiler
      .find({
        Fecha_Inicio: {
          $gte: "2023-07-05",
          $lte: "2023-07-10",
        },
      })
      .toArray();
    res.json({ status: 200, alquileres: alquileresFound });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
});

export { router };
