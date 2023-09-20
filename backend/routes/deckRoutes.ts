import express from "express";
import { createDeck } from "../controllers/deckController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create-deck", verifyJWT, createDeck);

export = router;
