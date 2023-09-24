import express from "express";
import { createDeck, fetchAllDecks, fetchDeckByID } from "../controllers/deckController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyJWT, fetchAllDecks);
router.get("/:id", verifyJWT, fetchDeckByID);
router.post("/create-deck", verifyJWT, createDeck);

export = router;
