import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import mongoose from "mongoose";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>, // can also work without customization, so no need to add this customization <{},{},NewUserRequestBody>. with help of customization, we can customically pass what should be in req.body and then we can access those custom fields by putting dot oper. like this req.body.customFieldName
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, photo, gender, _id, dob } = req.body;

    let user = await User.findById(_id);
    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome ${user.name}`,
      });
    }

    if (!_id || !name || !email || !photo || !gender || !dob)
      return next(new ErrorHandler("Please add all fields", 400));

    user = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob: new Date(dob),
    });

    return res.status(201).json({
      success: true,
      message: `Welcome ${user.name}`,
    });
  }
);

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({
    success: true,
    users,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  console.log("Received ID in backend : ", id); // Log to console for debugging
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid ID", 400));

  return res.status(200).json({
    success: true,message:"lol",
    user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.dynamicID;
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid ID", 400));

  // console.log("Deleted user is: ", user);
  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
