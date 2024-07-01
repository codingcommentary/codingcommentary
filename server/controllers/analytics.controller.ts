import { Request, Response, NextFunction } from "express";
import Errorhandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";

// get user analytics -- only for admin

export const getUsersAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await generateLast12MonthsData(userModel);

            res.status(200).json({
                success: true,
                users,
            });
        } catch (error: any) {
            return next(new Errorhandler(error.message, 500));
        }
    }
);
