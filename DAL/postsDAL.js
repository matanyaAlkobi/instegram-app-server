import fs from "fs/promises";

// Sends a request to the database to get all the data,
// and returns the data
export default async function loadDataFromDatabase(dbPath) {
  try {
    const dbData = await fs.readFile(dbPath, "utf-8");

    return JSON.parse(dbData);
  } catch (err) {
    console.error("Failed to load DB: " + err.message);
    throw err;
  }
}
