import express from "express";
import {
  getInsights,
  listInsights,
  removeInsight,
  markFavorite,
} from "../controllers/insightController.js";

const router = express.Router();

router.post("/insights", getInsights);
router.get("/insights", listInsights);
router.delete("/insights/:id", removeInsight);
router.put("/insights/:id/favorite", markFavorite);

export default router;
