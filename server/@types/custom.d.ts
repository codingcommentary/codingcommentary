import { Request } from "express";
import { IUser } from "../models/user.model";
import { ICourse } from "../models/course.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }

    interface IData {
      courseId: string;
      userId?: string;
      payment_info?: {
        id?: string;
        [key: string]: any;
      };
    }
  }

  interface IMailData {
    order: {
      _id: string;
      name: string;
      price: number;
      date: string;
    };
  }
}
