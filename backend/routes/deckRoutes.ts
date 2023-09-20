import express from "express";
import { createDeck, fetchAllDecks } from "../controllers/deckController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyJWT, fetchAllDecks);
router.post("/create-deck", verifyJWT, createDeck);

export = router;
