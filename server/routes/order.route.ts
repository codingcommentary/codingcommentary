import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createOrder,
  enrollInFreeCourse,
  getAllOrders,
  sendStripePublishableKey,
  newPayment,
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/enroll-course", isAuthenticated, enrollInFreeCourse);

orderRouter.post("/create-order", isAuthenticated, createOrder);

orderRouter.get(
  "/get-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAuthenticated, newPayment);

export default orderRouter;
