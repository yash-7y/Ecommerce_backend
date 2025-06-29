import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerType } from "../types/types.js";

export const errorMiddleware = (
  //   err: Error, // writing this means err can follow features & use features from inbuilt "Error" class only, it(err) can't have more features than error class.
  err: ErrorHandler, //so we made our custom class(called ErrorHandler) which already have every features of Error class cuz it extends Error class
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set defaults
  err.message ||= "int server error"; // just like x+=1, x=x+1
  err.statusCode ||= 500;

  // Handle specific error types
  if (err.name === "TypeError") {
    if (err.message.includes("destructure")) {
      err.message = "Invalid request format: missing required fields";
      err.statusCode = 400; // Set your custom status code
    }
    // Add other TypeError cases if needed
  }

  // Other error type handling
  if (err.name === "CastError") {
    err.message = "Invalid ID";
    err.statusCode = 400;
  }
  // Add additional error handling as needed....

  // sending response
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch = (func: ControllerType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error); // Just pass the error to middleware
    }
  };
};
