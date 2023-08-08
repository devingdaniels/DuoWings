import express, { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController";
// import { protect } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.post("/regiser", registerUser);
router.post("/login", loginUser);

export default router;
