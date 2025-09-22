// routes/wishlist.route.js
import { Router } from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
} from "../controllers/wishlist.controller.js";

const router = Router();

router.post("/add", addToWishlist);
router.post("/remove", removeFromWishlist);
router.get("/:userId", getUserWishlist);

export default router;