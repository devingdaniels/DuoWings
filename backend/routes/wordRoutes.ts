import express from "express";
import { createWord, deleteWordFromDeckByID, updateWordInDeckByID } from "../controllers/wordController";
import { verifyJWT } from "../middleware/auth";

const router = express.Router();

router.post("/create-word", verifyJWT, createWord);
router.delete("/delete-word/:id", verifyJWT, deleteWordFromDeckByID);
router.put("/update-word/:id", verifyJWT, updateWordInDeckByID);

export = router;
