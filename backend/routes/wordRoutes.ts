import express from "express";
import { createWord, deleteWordByID } from "../controllers/wordController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create-word", verifyJWT, createWord);
router.delete("/delete-word/:id", verifyJWT, deleteWordByID);

export = router;
