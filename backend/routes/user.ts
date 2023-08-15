import express from "express";
import { registerUser, logoutUser } from "../controllers/userController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.get("/logout", verifyJWT, logoutUser);

export = router;
