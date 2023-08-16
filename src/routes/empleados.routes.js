import { Router } from "express";
import db from "../db/config.js";
const router = Router();
const empleado = db.collection("empleado");

// 7. Listar los empleados con el cargo de "Vendedor".
router.get("/vendedores", async (req, res) => {
  try {
    const empeladosFound = await empleado.find({ Cargo: "Vendedor" }).toArray();
    res.json({ status: 200, empleados_vendedores: empeladosFound });
  } catch (error) {
    res.status(500)({ status: 500, error });
  }
});

// 13. Mostrar los empleados con cargo de "Gerente" o "Asistente".
router.get("/gerente_asistente", async (req, res) => {
  try {
    const empeladosFound = await empleado
      .find({ $or: [{ Cargo: "Gerente" }, { Cargo: "Asistente" }] })
      .toArray();
    res.json({ status: 200, empleados_gerenteasistente: empeladosFound });
  } catch (error) {
    res.status(500)({ status: 500, error });
  }
});

export { router };
