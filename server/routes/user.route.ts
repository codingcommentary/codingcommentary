import express from "express";
import {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updatePassword,
  updateProfilePicture,
  getAllUsers,
  updateUserRole,
  deleteUser,
  updateCourseCompletion,
  getUserCourseCompletion,
  getUserEnrolledCourses,
  requestPasswordReset,
  resetPassword,
 
} from "../controllers/user.controller";
import { isAuthenticated, authorizeRoles } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, authorizeRoles("admin"), logoutUser);

userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

userRouter.put("/update-user-password", isAuthenticated, updatePassword);

userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

userRouter.get(
  "/get-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

userRouter.put(
  "/update-user",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

userRouter.put(
  "/update-course-completion",
  isAuthenticated,
  updateCourseCompletion
);

userRouter.get(
  "/user-course-completion",
  isAuthenticated,
  getUserCourseCompletion
);

userRouter.get(
  "/user-enrolled-courses",
  isAuthenticated,
  getUserEnrolledCourses
);

userRouter.post("/reset-password", resetPassword); 

userRouter.post("/request-password-reset", requestPasswordReset);

export default userRouter;
