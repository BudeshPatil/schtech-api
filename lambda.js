// lambda.js

import serverless from "serverless-http";
import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
await connectDB();
export const handler = serverless(app);