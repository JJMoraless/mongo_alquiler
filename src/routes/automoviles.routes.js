import { Router } from "express";
import db from "../db/config.js";
const automovil = db.collection("automovil");
const router = Router();

// 16. Listar todos los automóviles ordenados por marca y modelo.
router.get("/", async (req, res) => {
  try {
    const autosFound = await automovil.find().sort({ Marca: 1 }).toArray();
    res.json({ status: 200, automoviles: autosFound });
  } catch (error) {
    res.status(500)({ status: 500, error });
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
    res.status(500)({ status: 500, error });
  }
});

export { router };
