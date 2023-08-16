import { Router } from "express";
import db from "../db/config.js";

const router = Router();
const clientes = db.collection("cliente");
const alquiler = db.collection("alquiler");


// 2. Mostrar todos los clientes registrados en la base de datos.

router.get("/", async (req, res) => {
  try {
    const clientesFound = await clientes.find().toArray();
    res.json({ status: 200, clientes: clientesFound });
  } catch (error) {
    res.status(500)({ status: 500, error });
  }
});

// 15.Obtener los datos de los clientes que realizaron al menos un alquiler
router.get("/unalquiler", async (req, res) => {
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
          $unwind: "$cliente",
        },
        {
          $project: {
            cliente: 1,
            _id: 0,
          },
        },
      ])
      .toArray();
    res.json({ status: 200, clientes_reserva: reservasFound });
  } catch (error) {
    res.status(500)({ status: 500, error });
  }
});

// 10.Listar los clientes con el DNI específico. 
router.get("/:DNI", async (req, res) => {
    const { DNI } = req.params;
    try {
      const clienteFound = await clientes.findOne({ DNI });
      res.json({ status: 200, clientes: clienteFound });
    } catch (error) {
      res.status(500)({ status: 500, error });
    }
  });
  
export { router };