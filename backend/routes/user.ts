import express from "express";
import { registerUser, loginUser } from "../controllers/userController";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed" });
});

export = router;
