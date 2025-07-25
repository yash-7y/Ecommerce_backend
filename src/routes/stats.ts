import express from "express";
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from "../controllers/stats.js";
import { adminOnly } from "../middlewares/auth.js";

const app=express.Router();

// route - /api/v1/dashboard/stats
app.get("/stats",adminOnly,getDashboardStats);

//    /api/v1/dashboard/pie
app.get("/pie",adminOnly,getPieCharts);

//    /api/v1/dashboard/bar
app.get("/bar",adminOnly,getBarCharts);

//    /api/v1/dashboard/line
app.get("/line",adminOnly,getLineCharts);


export default app;