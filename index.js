import express from "express";
import cuentasRouter from "./routes/accounts.routes.js";
import cuentaRouter from "./routes/acc.routes.js";

const app = express();

const PORT = 3130;

// Middlewares
app.use(express.json()); 

app.use("/cuentas", cuentasRouter); 
app.use("/cuenta", cuentaRouter); 

app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});