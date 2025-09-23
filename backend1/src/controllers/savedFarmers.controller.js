import { db } from "../dbConnection/dbConnection.js";
import { savedFarmers } from "../models/schema.js";
import { eq, and } from "drizzle-orm";

export const saveFarmer = async (req, res) => {
  const { farmerId } = req.body;
  const { buyerId } = req.body;

  try {
    // check if already saved
    const existing = await db
      .select()
      .from(savedFarmers)
      .where(
        and(
          eq(savedFarmers.buyerId, buyerId),
          eq(savedFarmers.farmerId, farmerId)
        )
      );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Farmer already saved!" });
    }

    const [newSave] = await db
      .insert(savedFarmers)
      .values({ buyerId, farmerId })
      .returning();

    res.json(newSave);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving farmer" });
  }
};

export const unsaveFarmer = async (req, res) => {
  const { farmerId, buyerId } = req.params;

  try {
    await db
      .delete(savedFarmers)
      .where(
        and(
          eq(savedFarmers.buyerId, buyerId),
          eq(savedFarmers.farmerId, Number(farmerId))
        )
      );

    res.json({ message: "Farmer unsaved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error unsaving farmer" });
  }
};

export const getSavedFarmers = async (req, res) => {
  const buyerId = req.user.id;

  try {
    const saved = await db
      .select()
      .from(savedFarmers)
      .where(eq(savedFarmers.buyerId, buyerId));

    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching saved farmers" });
  }
};
