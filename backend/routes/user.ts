import express from "express";
import { registerUser } from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
// router.post("/login", controller.login);
// router.get("/get/all", controller.getAllUsers);

export = router;
