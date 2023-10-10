import express from "express";
import { createWord } from "../controllers/wordController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create-word", verifyJWT, createWord);

export = router;
