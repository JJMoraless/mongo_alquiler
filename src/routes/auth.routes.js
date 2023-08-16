import { Router } from "express";
import { createToken } from "../utils/jwt.js";
const router = Router();

export const login = async (req, res) => {
  try {
    const token = await createToken(1);
    res.cookie("token", token);
    res.status(200).json({ message: "autenticado correctamete", token });
  } catch (error) {
    console.log("paso por aca");
    res.status(404).json(error);
  }
};

export const logOut = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.status(200).json({ msg: "sesión cerrada" });
};

router.get("/login", login);
router.get("/logout", logOut);
export { router };
