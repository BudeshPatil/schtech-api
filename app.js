import express from 'express';
import userRoutes from './routes/userRoutes.js';
import cors from "cors";
import helmet from "helmet";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(helmet());
app.use(express.json());
//swagger
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";

//Globale Error Handling
const errorHandler = (err,req,res,next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message
  });
};

app.use(
 "/api-docs",
 swaggerUi.serve,
 swaggerUi.setup(swaggerSpec)
);

app.use('/api/user',userRoutes);

app.use(errorHandler);

app.use('/',(req,res)=>{
    console.log('hello word');
    res.send('Hello WOrd');
});

export default app;