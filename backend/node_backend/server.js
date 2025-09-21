import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Placeholder Gemini API URL and API key - replace with actual values
const GEMINI_API_URL = 'https://api.gemini.example.com/analyze';
const GEMINI_API_KEY = 'AIzaSyAmmDnLDTos7eJLr1y0Q5LH6KflJjcfkVs';

app.post('/api/analyze', async (req, res) => {
  const { text } = req.body;

  if (typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing "text" in request body' });
  }

  // Construct prompt for Gemini API to generate structured JSON output
  const prompt = `
You are an expert fact-checking assistant. Analyze the following text and provide a JSON response strictly matching this interface:

interface AnalysisResult {
  trustScore: number;
  verdict: "credible" | "uncertain" | "misleading";
  explanation: string;
  simplifiedExplanation: string;
  evidence: Array<{
    source: string;
    excerpt: string;
    url: string;
    date?: string;
    author?: string;
    credibilityRating?: "high" | "medium" | "low";
  }>;
}

Text to analyze:
"""${text}"""

Please respond ONLY with the JSON object matching the interface above.
`;

  try {
    // Call Gemini API with prompt
    const response = await axios.post(
      GEMINI_API_URL,
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GEMINI_API_KEY}`,
        },
      }
    );

    // Assuming Gemini API returns data in the required AnalysisResult format
    const analysisResult = response.data;

    // Validate or transform analysisResult here if needed

    res.json(analysisResult);
  } catch (error) {
    console.error('Error calling Gemini API:', error.message || error);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
});

app.listen(port, () => {
  console.log(`Satya Node.js backend listening at http://localhost:${port}`);
});
