import express from "express";
import { SampleController } from "../controllers/SampleController";
import { User } from "../controllers/userController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const router = express.Router();

router.get("/", SampleController.getSample);
router.post("/user/signup", User.signup);
router.post("/user/login", User.login);
router.get("/user/current", jwtMiddleware, User.currentUser);
router.put("/user/update", jwtMiddleware, User.updateUser);
router.get("/user", jwtMiddleware, User.getAllUsers);
export default router;
