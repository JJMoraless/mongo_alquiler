import { Router } from "express";
import db from "../db/config.js";
const router = Router();
const reserva = db.collection("reserva");

// 13. Listar las reservas pendientes realizadas por un cliente específico.

router.get("/pendientes/:idCliente", async (req, res) => {
  try {
    const { idCliente: strIdClient } = req.params;
    const idCliente = parseInt(strIdClient);
    const autosDispo = await reserva
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
            Estado: "Pendiente",
            ID_Cliente: idCliente,
          },
        },
      ])
      .toArray();
    res.json({ status: 200, reservas_pendientes: autosDispo, idCliente });
  } catch (error) {
    res.status(500)({ status: 500, error });
  }
});

// 5. Mostrar todas las reservas pendientes con los datos del cliente  y el automóvil reservado.

router.get("/pendientes", async (req, res) => {
  try {
    const autosDispo = await reserva
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
          $lookup: {
            from: "automovil",
            localField: "ID_Automovil",
            foreignField: "ID_Automovil",
            as: "automovil",
          },
        },
        {
          $match: {
            Estado: "Pendiente",
          },
        },
      ])
      .toArray();
    res.json({ status: 200, reservas_pendientes: autosDispo });
  } catch (error) {
    res.status(500)({ status: 500, error });
  }
});

export { router };
