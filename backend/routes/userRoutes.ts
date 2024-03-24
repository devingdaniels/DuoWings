import express from "express";
import { registerUser, logoutUser, loginUser, deleteUser } from "../controllers/userController";
import { verifyJWT } from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.get("/logout", verifyJWT, logoutUser);
router.post("/login", loginUser);
router.delete("/delete-account", verifyJWT, deleteUser);

export = router;
