import OpenAI from "openai";
import * as fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateWeather() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: "Berikan deskripsi kondisi cuaca acak dalam satu kalimat." }],
    });

    const weather = response.choices[0].message.content;
    console.log(`Cuaca: ${weather}`);
    fs.writeFileSync("weather.txt", weather);
  } catch (error) {
    console.error("Error generating weather:", error);
  }
}

generateWeather();
