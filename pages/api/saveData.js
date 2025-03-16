import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const filePath = path.join(process.cwd(), "data", "buildings.json");

      // Ensure 'data' directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Write the file asynchronously
      await fs.writeFile(filePath, JSON.stringify(req.body, null, 2), "utf-8");

      return res.status(200).json({ message: "Data saved successfully!" });
    } catch (error) {
      console.error("Error writing file:", error);
      return res.status(500).json({ error: "Failed to write file." });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}