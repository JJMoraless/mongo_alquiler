import { Router } from "express";
import db from "../db/config.js";

const router = Router();
const clientes = db.collection("cliente");


// 2. Mostrar todos los clientes registrados en la base de datos.

router.get("/", async (req, res) => {
  try {
    const clientesFound = await clientes.find().toArray();
    res.json({ status: 200, clientes: clientesFound });
  } catch (error) {
    res.status(500)({ status: 500, error });
  }
});