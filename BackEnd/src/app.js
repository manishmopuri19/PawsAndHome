import express from "express";
import petRouter from "./routers/petRouter.js";
import authRouter from "./routers/authRouter.js";
import docRouter from "./routers/docRouter.js";
import userRouter from "./routers/userRouter.js";
import cors from "cors";
const app = express();


app.use(cors({
  origin: [
    "https://pawsandhomes.netlify.app"
  ]
}));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//roters forwaording
app.use("/api/auth",authRouter)
app.use("/api/pets",petRouter)
app.use("/api/docs",docRouter)
app.use("/api/userDashboard",userRouter)


export default app;
