import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getUsersAnalytics } from "../controllers/analytics.controller";
const analyticsRouter = express.Router();


analyticsRouter.get("/get-users-analytics", isAuthenticated,authorizeRoles("admin"), getUsersAnalytics);


export default analyticsRouter;