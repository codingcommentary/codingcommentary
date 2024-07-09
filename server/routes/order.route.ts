import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createOrder,
  enrollInFreeCourse,
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/enroll-course", isAuthenticated, enrollInFreeCourse);

orderRouter.post("/create-order", isAuthenticated, createOrder);

export default orderRouter;
