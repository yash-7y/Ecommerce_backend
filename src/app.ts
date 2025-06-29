import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import NodeCache from "node-cache";
import { connectDB } from "./utils/features.js";
import Stripe from "stripe";
import cors from "cors";

//importing middleware
import { errorMiddleware } from "./middlewares/error.js";

// importing routes
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import productRoute from "./routes/product.js";
import dashboardRoute from "./routes/stats.js";
import userRoute from "./routes/user.js";

config({
  path: "./.env",
});

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

connectDB(mongoURI);
export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); // if want customization:- {origin:"http://localhost:5173/", methods: [post, put, get], credentails: true}

// using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.get("/", (_req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Express running on http://localhost:${port}`);
});
