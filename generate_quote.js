import OpenAI from "openai";
import * as fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

    const quote = response.choices[0].message.content;
    console.log(`Kutipan: ${quote}`);
    fs.writeFileSync("quote.txt", quote);
  } catch (error) {
    console.error("Error generating quote:", error);
  }
}

generateQuote();
