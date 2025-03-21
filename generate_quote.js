import OpenAI from "openai";
import { promises as fs } from "fs";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("❌ OPENAI_API_KEY tidak ditemukan di environment!");
  process.exit(1);
}

const openai = new OpenAI({ apiKey });

async function generateQuote() {
  const promptOptions = [
    "Buatkan kutipan motivasi tentang kerja keras.",
    "Buat kutipan inspiratif tentang kesuksesan.",
    "Beri saya satu kutipan bijak tentang belajar dan kehidupan.",
  ];
  const prompt = promptOptions[Math.floor(Math.random() * promptOptions.length)];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    // Cek apakah response valid
    if (!response.choices || response.choices.length === 0) {
      throw new Error("Response dari OpenAI kosong atau tidak valid.");
    }

    const quote = response.choices[0].message.content.trim();
    console.log(`✅ Kutipan: ${quote}`);

    await fs.writeFile("quote.txt", quote, "utf-8");
    console.log("✅ Kutipan disimpan di quote.txt");
  } catch (error) {
    console.error("❌ Error generating quote:", error.message);
  }
}

generateQuote();
