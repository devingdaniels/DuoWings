import express from "express";
import { createWord, deleteWordFromDeckByID } from "../controllers/wordController";
import { verifyJWT } from "../middleware/auth";

const router = express.Router();

router.post("/create-word", verifyJWT, createWord);
router.delete("/delete-word/:id", verifyJWT, deleteWordFromDeckByID);

export = router;
