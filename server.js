const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const helmet = require('helmet');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Security and Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// OpenAI Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate Flashcards logic with retry mechanism
 */
async function generateFlashcardsWithRetry(notes, retryCount = 1) {
    const prompt = `
    You are an expert educator. Create a JSON array of 5 to 10 flashcards based on the following study notes.
    Each flashcard must be an object with exactly two keys: "question" and "answer".
    Return ONLY the valid JSON array. No extra text, no markdown code blocks.

    Notes:
    ${notes}
  `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // or "gpt-4o"
            messages: [
                { role: "system", content: "You are a helpful assistant that outputs only valid JSON arrays." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
        });

        const content = completion.choices[0].message.content.trim();

        // Attempt to parse JSON
        try {
            // In case AI wraps it in markdown triple backticks
            const jsonString = content.replace(/```json|```/g, '').trim();
            const flashcards = JSON.parse(jsonString);

            // Validate structure
            if (Array.isArray(flashcards) && flashcards.every(f => f.question && f.answer)) {
                return flashcards;
            } else {
                throw new Error("Invalid structure");
            }
        } catch (parseError) {
            if (retryCount > 0) {
                console.log("JSON parsing failed, retrying...");
                return await generateFlashcardsWithRetry(notes, retryCount - 1);
            } else {
                throw new Error("Failed to generate valid JSON after retries.");
            }
        }
    } catch (error) {
        console.error("OpenAI Error:", error.message);
        throw error;
    }
}

// Routes
app.post('/api/generate-flashcards', async (req, res) => {
    const { notes } = req.body;

    if (!notes || notes.trim().length < 10) {
        return res.status(400).json({ error: "Please provide more substantial notes (at least 10 characters)." });
    }

    try {
        const flashcards = await generateFlashcardsWithRetry(notes);
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: "HorizonCard AI Backend is running" });
});

app.listen(port, () => {
    console.log(`HorizonCard AI Backend listening at http://localhost:${port}`);
});
