import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Required for Formidable to work properly
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return res.status(500).json({ error: "Error parsing file" });
      }

      const file = files.file[0];
      const buildingId = fields.buildingId[0];

      if (!file || !buildingId) {
        return res.status(400).json({ error: "Missing file or building ID" });
      }

      const uploadDir = path.join(process.cwd(), "public/buildings");

      // Ensure the 'public/buildings' directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Check how many images already exist for this building
      const existingImages = fs.readdirSync(uploadDir).filter(fileName =>
        fileName.startsWith(`building_${buildingId}_img_`)
      );

      // Generate a new consecutive filename
      const nextNumber = String(existingImages.length + 1).padStart(3, "0"); // e.g., 001, 002
      const fileExtension = path.extname(file.originalFilename);
      const newFileName = `building_${buildingId}_img_${nextNumber}${fileExtension}`;
      const newFilePath = path.join(uploadDir, newFileName);

      console.log("Saving file as:", newFileName);

      // Move the file from temp storage to the public directory
      fs.rename(file.filepath, newFilePath, (renameErr) => {
        if (renameErr) {
          console.error("File move error:", renameErr);
          return res.status(500).json({ error: "Failed to save file" });
        }

        return res.status(200).json({ fileName: newFileName });
      });
    });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to save file" });
  }
};