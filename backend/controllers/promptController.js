import dotenv from 'dotenv';
import { connectDB } from '../utils/dbConnect.js'; 
import { Groq } from 'groq-sdk';
import Prompt from '../models/promptModel.js';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const SendPrompt = async (req, res) => {
  const { content } = req.body;
  const { userId } = req;

  if (!content?.trim()) {
    return res.status(400).json({ errors: 'Prompt content is required' });
  }

  try {
    await connectDB(); 

    const trimmedContent = content.trim();

    // Save user prompt
    await Prompt.create({
      userId,
      role: 'user',
      content: trimmedContent,
    });

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: trimmedContent }],
      model: 'llama-3.1-8b-instant',
    });

    const reply = completion?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ errors: 'No response from assistant' });
    }

    // Save assistant response
    await Prompt.create({
      userId,
      role: 'assistant',
      content: reply,
    });

    return res.status(200).json({ reply });
  } catch (err) {
    const status = err?.status;
    const message =
      status === 402
        ? 'Insufficient balance. Please check your API subscription or quota.'
        : 'Internal server error';

    console.error('SendPrompt error:', err);
    return res.status(status || 500).json({ error: message });
  }
};
