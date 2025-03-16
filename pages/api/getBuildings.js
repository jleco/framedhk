import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "buildings.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const buildings = JSON.parse(fileContents);

    res.status(200).json(buildings);
  } catch (error) {
    console.error("Error reading buildings.json:", error);
    res.status(500).json({ error: "Failed to load buildings data." });
  }
}