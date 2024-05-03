import express from "express";
import { generateSpeechFromText } from "../controllers/voice.controller";

const router = express.Router();

router.route("/generate-speech-from-text").post(generateSpeechFromText);

export default router;
