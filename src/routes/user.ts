import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";

const app=express.Router();

// its route is : /api/v1/user/new
app.post("/new", newUser);

// route - /api/v1/user/all
app.get("/all", adminOnly ,getAllUsers);

// route - /api/v1/user/dynamicID
app.get("/:id",getUser)

// route - /api/v1/user/dynamicID
app.delete("/:dynamicID", adminOnly ,deleteUser)

export default app;