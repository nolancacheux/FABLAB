"use strict";

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(config);

const app = express();
console.log("Clé API : ",process.env.OPEN_API_KEY);
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "YOOOOOOOOOO",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.4,
      max_tokens: 170, // Set the desired number of tokens here
      messages: [{role: "user", content: `${prompt}`}], 
    });
    console.log(response.data);
    console.log(response.data.choices[0].message.content);
    res.status(200).send({
      message: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});


app.listen(5000, () =>
  console.log("Server running on port http://localhost:5000")
);