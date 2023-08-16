import { Router } from "express";
import db from "../db/config.js";
const automovil = db.collection("automovil");
const alquiler = db.collection("alquiler");
const router = Router();

// 16. Listar todos los automóviles ordenados por marca y modelo.
router.get("/", async (req, res) => {
  try {
    const autosFound = await automovil.find().sort({ Marca: 1 }).toArray();
    res.json({ status: 200, automoviles: autosFound });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
});

// 3. Obtener todos los automóviles disponibles para alquiler.
router.get("/disponibles", async (req, res) => {
  try {
    const autosDispo = await alquiler
      .aggregate([
        {
          $lookup: {
            from: "automovil",
            localField: "ID_Automovil",
            foreignField: "ID_Automovil",
            as: "automovil",
          },
        },
        {
          $unwind: "$automovil",
        },
        {
          $match: {
            Estado: "Disponible",
          },
        },
        {
          $project: {
            Estado: 1,
            automovil: 1,
          },
        },
      ])
      .toArray();
    res.json({ status: 200, automoviles_disponibles: autosDispo });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
});

// 18. Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.

router.get("/disponibles_capacidad5", async (req, res) => {
  try {
    const autosDispo = await alquiler
      .aggregate([
        {
          $lookup: {
            from: "automovil",
            localField: "ID_Automovil",
            foreignField: "ID_Automovil",
            as: "automovil",
          },
        },
        {
          $unwind: "$automovil",
        },
        {
          $match: {
            Estado: "Disponible",
            "automovil.Capacidad": 5,
          },
        },
      ])
      .toArray();
    res.json({ status: 200, automoviles_disponibles: autosDispo });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
});

// 11.Mostrar todos los automóviles con una capacidad mayor a 5 personas.
router.get("/mayor_5", async (req, res) => {
  try {
    const autosFound = await automovil
      .find({ Capacidad: { $gt: 5 } })
      .toArray();
    res.json({ status: 200, automoviles: autosFound });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
});

export { router };
