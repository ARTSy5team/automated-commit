import OpenAI from "openai";
import { promises as fs } from "fs";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("❌ OPENAI_API_KEY tidak ditemukan di environment!");
  process.exit(1);
}

const openai = new OpenAI({ apiKey });

async function generateWeather() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: "Berikan deskripsi kondisi cuaca acak dalam satu kalimat." }],
    });

    // Cek apakah response valid
    if (!response.choices || response.choices.length === 0) {
      throw new Error("Response dari OpenAI kosong atau tidak valid.");
    }

    const weather = response.choices[0].message.content.trim();
    console.log(`✅ Cuaca: ${weather}`);

    await fs.writeFile("weather.txt", weather, "utf-8");
    console.log("✅ Cuaca disimpan di weather.txt");
  } catch (error) {
    console.error("❌ Error generating weather:", error.message);
  }
}

generateWeather();
