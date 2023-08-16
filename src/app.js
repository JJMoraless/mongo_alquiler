
import express from "express";
import morgan from "morgan";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();

// midlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// rutas
app.use(router);
export default app;
