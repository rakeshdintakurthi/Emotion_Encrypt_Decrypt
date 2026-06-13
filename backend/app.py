import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import torch

app = FastAPI(
    title="Emotion Cipher ML Service",
    description="FastAPI service hosting the local DistilRoBERTa emotion classification model."
)

# Enable CORS for React frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Hugging Face emotion classifier
# The j-hartmann/emotion-english-distilroberta-base model classifies text into 7 emotions:
# anger, disgust, fear, joy, neutral, sadness, surprise
print("Initializing DistilRoBERTa model...")
device = 0 if torch.cuda.is_available() else -1
try:
    classifier = pipeline(
        "text-classification",
        model="j-hartmann/emotion-english-distilroberta-base",
        top_k=None,
        device=device
    )
    print(f"Model loaded successfully on device: {'GPU (cuda)' if device == 0 else 'CPU'}")
except Exception as e:
    print(f"Error loading model: {e}")
    print("Falling back to CPU device...")
    classifier = pipeline(
        "text-classification",
        model="j-hartmann/emotion-english-distilroberta-base",
        top_k=None,
        device=-1
    )

class PredictRequest(BaseModel):
    text: str

class EmotionScore(BaseModel):
    label: str
    score: float

class PredictResponse(BaseModel):
    emotion: str
    confidence: float
    all_scores: list[EmotionScore]

@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text parameter cannot be empty")

    try:
        # Inference
        results = classifier(request.text)[0]
        
        # Sort scores in descending order
        sorted_results = sorted(results, key=lambda x: x["score"], reverse=True)
        
        dominant = sorted_results[0]
        
        # Format list of scores
        all_scores = [
            EmotionScore(label=item["label"], score=round(item["score"], 4))
            for item in sorted_results
        ]
        
        return PredictResponse(
            emotion=dominant["label"],
            confidence=round(dominant["score"], 4),
            all_scores=all_scores
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model inference failed: {str(e)}")

@app.get("/health")
def health():
    return {
        "status": "online",
        "model": "j-hartmann/emotion-english-distilroberta-base",
        "device": "cuda" if device == 0 else "cpu"
    }

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
