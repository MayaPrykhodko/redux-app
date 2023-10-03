import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from 'url';
import "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/public')));


const port = 3050;
app.listen(port, () => {});

export { app };