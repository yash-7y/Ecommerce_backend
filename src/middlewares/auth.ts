import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

// middleware to make sure only admin is allowed
export  const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("Login required", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Fake Id given", 401));
  if (user.role !== "admin")
    return next(
      new ErrorHandler("Access Denied!...(Only admin can access)", 401)
    );
  next();
});
