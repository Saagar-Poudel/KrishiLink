// routes/dashboard.route.js
import express from "express";
import { addDeletedUser, createReport, deleteBuyer, getAllBuyers, getAllSellers, getChartsData, getDashboardStats, getDeletedUsers, getReports, updateBuyer, updateSeller } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/buyers", getAllBuyers);
router.delete("/buyers/:id", deleteBuyer);
router.put("/buyers/:id", updateBuyer);
router.get("/sellers", getAllSellers);
router.delete("/sellers/:id", deleteBuyer);
router.put("/sellers/:id", updateSeller);
router.post("/users/delete", addDeletedUser); // store deleted user
router.get("/users/delete", getDeletedUsers); // get all deleted users
router.post("/reports", createReport);
router.get("/reports", getReports);
router.get("/charts", getChartsData);

export default router;