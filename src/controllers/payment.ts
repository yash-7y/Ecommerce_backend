import { stripe } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";

export const createPaymentIntent = TryCatch(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) {
    return next(new ErrorHandler("Please enter amount", 400));
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount) * 100,
    currency: "inr",
  });

  return res.status(201).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

export const newCoupon = TryCatch(async (req, res, next) => {
  // Validate first - better than relying on error handling
  // if (!req.body) throw new ErrorHandler("Request body required", 400);

  const { coupon, amount } = req.body; // Let the error happen naturally

  if (!coupon || !amount) {
    return next(new ErrorHandler("Please enter both coupon and amount", 400));
  }

  await Coupon.create({ code: coupon, amount });

  return res.status(201).json({
    success: true,
    message: `Coupon ${coupon} Created Successfully`,
  });
});

export const applyDiscount = TryCatch(async (req, res, next) => {
  const { coupon } = req.query;

  const discount = await Coupon.findOne({ code: coupon });

  if (!discount) {
    return next(new ErrorHandler("Invalid Coupon Code", 400));
  }

  return res.status(200).json({
    success: true,
    discount: discount.amount,
  });
});

export const allCoupons = TryCatch(async (req, res, next) => {
  const coupons = await Coupon.find({});
  return res.status(200).json({
    success: true,
    message: `Total Coupons are: ${coupons.length}`,
    coupons,
  });
});

export const deleteCoupon = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete(id);

  if (!coupon) return next(new ErrorHandler("Invalid Coupon Id", 400));

  //await Coupon.deleteOne({ _id: idd }); //{_id:id} - Delete the document where _id is equal to this id, {_id:coupon._id} - Delete the document where _id is the same as this coupon’s ID,
  // {_id:coupon.id} - (not safe method) Delete the document where _id matches this string ID;
  //  coupon.id is a string version of the ID.MongoDB stores _id as an ObjectId, not a string.Mongoose is smart and can sometimes convert the string to ObjectId automatically.

  return res.status(200).json({
    success: true,
    message: `Coupon ${coupon.code} Deleted Successfully}`,
    coupon,
  });
});
