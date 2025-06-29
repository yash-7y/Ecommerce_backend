import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    // this is userid
    user: {
      type: String,
      ref: "User",
      required: true,
    },

    subtotal: {
      type: Number,
      require: true,
    },

    tax: {
      type: Number,
      require: true,
    },

    shippingCharges: {
      type: Number,
      require: true,
    },

    discount: {
      type: Number,
      require: true,
    },

    total: {
      type: Number,
      require: true,
    },

    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },

    orderItems: [
      {
        name: String,
        photo: String,
        price: Number,
        quantity: Number,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", schema);
