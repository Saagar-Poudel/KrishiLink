import express from "express";
import { saveFarmer, unsaveFarmer, getSavedFarmers } from "../controllers/savedFarmers.controller.js";

const router = express.Router();

router.post("/save", saveFarmer);
router.delete("/unsave/:farmerId/:buyerId", unsaveFarmer);
router.get("/my-saved", getSavedFarmers);

export default router;