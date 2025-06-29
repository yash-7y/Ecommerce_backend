import mongoose, { Document } from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";

export const connectDB = async (uri: string) => {
  await mongoose
    .connect(uri, {
      dbName: "Ecom_P", // no space in the db name
    })
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const invalidateCache =  ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);
    if (typeof productId === "object")
      productId.forEach((i) => productKeys.push(`product-${productId}`));

    myCache.del(productKeys);
  }

  if (order) {
    const orderKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(orderKeys);
  }

  if (admin) {
    myCache.del([
      "admin-stats",
      "admin-pie-charts",
      "admin-bar-charts",
      "admin-line-charts",
    ]);
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product not Found");
    product.stock -= order.quantity;
    await product.save();
  }
};

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
  if (lastMonth === 0) return thisMonth * 100;
  const percent = (thisMonth / lastMonth) * 100;
  return Number(percent.toFixed(0));
};

export const getInventories = async ({
  categories,
  productsCount,
}: {
  categories: string[];
  productsCount: number;
}) => {
  // eg- const categories = ['electronics', 'clothing', 'furniture'];
  //  const cateArr = categories.map(categoryName => Product.countDocuments({ category: categoryName }));   or like this-  Product.countDocuments({ category: 'electronics' })

  const categoriesCountPromise = categories.map((category) =>
    Product.countDocuments({ category: category })
  );
  const categoriesCount = await Promise.all(categoriesCountPromise);

  const categoriesAndCountMapInPercentage: Record<string, number>[] = [];

  categories.forEach((categoriesElem, i) => {
    categoriesAndCountMapInPercentage.push({
      [categoriesElem]: Math.round((categoriesCount[i] / productsCount) * 100),
    });
  });
  return categoriesAndCountMapInPercentage;
};

interface IMyDocument extends Document {
  createdAt: Date;
  discount?: number | null;
  total?: number | null;
}

type getChartDataParams = {
  length: number;
  docArr: IMyDocument[];
  today: Date;
  Mineproperty?: "discount" | "total";
};

export const getChartData = ({
  length,
  docArr,
  today,
  Mineproperty,
}: getChartDataParams) => {
  const data: number[] = new Array(length).fill(0);

  docArr.forEach((i) => {
    const creationDate = i.createdAt;
    let monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
    if (monthDiff < length) {
      data[length - 1 - monthDiff] += Mineproperty ? i[Mineproperty]! : 1;
    }
  });
  return data;
};
