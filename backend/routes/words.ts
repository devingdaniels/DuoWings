import express from "express";
import { verifyJWT } from "../middleware/authMiddleware";
import { getAllWords } from "../services/words";

const router = express.Router();

router.get("/words", verifyJWT, getAllWords);

export default router;
