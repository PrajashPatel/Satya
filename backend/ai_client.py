# Placeholder Gemini API wrapper (mocked)

def analyze_with_ai(text: str) -> dict:
    """
    Mock AI analysis.
    Replace later with Gemini/Vertex AI API call.
    """
    if "vaccine" in text.lower():
        verdict = "Likely credible, but verify with health ministry sources."
    elif "alien" in text.lower():
        verdict = "Highly unlikely and misleading."
    else:
        verdict = "Unclear, needs further verification."

    return {
        "verdict": verdict,
        "explanation": "This is a mock analysis. Connect Gemini API here.",
        "counter_message": "Check official fact-checking sites before sharing.",
        "sources": [
            {"name": "Google Fact Check", "url": "https://toolbox.google.com/factcheck/explorer"},
            {"name": "Alt News", "url": "https://www.altnews.in/"}
        ]
    }
# Real implementation would involve calling the Gemini API with proper authentication and handling.