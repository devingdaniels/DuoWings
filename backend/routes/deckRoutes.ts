import express from "express";
import { createDeck, fetchAllDecks, fetchDeckByID, deleteDeckByID } from "../controllers/deckController";
import { verifyJWT } from "../middleware/auth";

const router = express.Router();

router.get("/", verifyJWT, fetchAllDecks);
router.get("/:id", verifyJWT, fetchDeckByID);
router.post("/create-deck", verifyJWT, createDeck);
router.delete("/:id", verifyJWT, deleteDeckByID);

export = router;
