import express from "express";
import authRoutes from "./routes/auth.routes";
import speciesRoutes from "./routes/species.routes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/species", speciesRoutes);

export default app;