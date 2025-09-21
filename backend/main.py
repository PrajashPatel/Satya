from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from fetcher import process_input
from credibility import evaluate_credibility
from ai_client import analyze_with_ai

# FastAPI Setup 
app = FastAPI(
    title="Satya API",
    description="AI-powered misinformation detection and fact-checking service",
    version="1.0.0"
)

# Allow frontend (React/Vite) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class VerifyRequest(BaseModel):
    input: str

class VerifyResponse(BaseModel):
    verdict: str
    trust_score: int
    explanation: str
    evidence: list
    metadata: dict

# ----------- Routes -----------
@app.get("/")
def root():
    return {"message": "Welcome to Satya API. Use /verify to check misinformation."}

@app.post("/verify", response_model=VerifyResponse)
def verify(request: VerifyRequest):
    try:
        # Step 1: Fetch & Clean
        structured_input = process_input(request.input)

        if "error" in structured_input:
            raise HTTPException(status_code=400, detail=structured_input["error"])

        # Step 2: Credibility Analysis
        credibility_result = evaluate_credibility(structured_input)

        # Step 3: AI-powered Analysis
        ai_result = analyze_with_ai(structured_input["cleaned_text"], credibility_result)

        # Merge results
        return VerifyResponse(
            verdict=ai_result["verdict"],
            trust_score=credibility_result["score"],
            explanation=ai_result["explanation"],
            evidence=ai_result.get("evidence", []),
            metadata=structured_input.get("metadata", {})
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
