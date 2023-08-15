import express from "express";
import { registerUser, logoutUser } from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
router.get("/logout", logoutUser);

export = router;
