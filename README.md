# 🎭 EMOTION CIPHER

> "Where feelings stay readable, but words stay private"

## 🎥 Live Demo Video (Hackathon Submission)
DEMO VIDEO LINK:https://drive.google.com/file/d/1pADfiWbla-fvxoPGwd3fDoELIx4C79Pk/view?usp=sharing

Emotion-Aware Secure Communication using Transformer-Based Emotion Classification

Emotion Cipher is a machine learning-powered privacy system that preserves emotional context while protecting textual content through encryption.

The project combines Natural Language Processing (NLP), Transformer-based Emotion Classification, and AES Encryption to enable secure communication where emotional intent remains visible while message content stays encrypted.

Problem Statement

Traditional encryption completely hides message content, including emotional context.

Example:

Original:
"I am extremely happy that I got selected."

Encrypted:
U2FsdGVkX1...


The emotional intent is lost.

Emotion Cipher addresses this by extracting emotional information before encryption and attaching emotion metadata to encrypted content.

[JOY]
U2FsdGVkX1...

This allows recipients and systems to understand emotional tone without exposing sensitive information.

Features
Emotion Detection
Multi-class emotion classification
Joy
Sadness
Anger
Fear
Anxiety
Love
Excitement
Neutral
Transformer-Based NLP
Fine-tuned DistilBERT model
Context-aware emotion recognition
Confidence score prediction
Secure Encryption
AES-256 encryption
Emotion metadata preservation
Secure ciphertext generation
Explainable AI
Confidence visualization
Emotion probability distribution
Important word attribution
Machine Learning Pipeline
Input Text
    ↓
Preprocessing
    ↓
Fine-Tuned DistilBERT
    ↓
Emotion Classification
    ↓
Confidence Scores
    ↓
AES Encryption
    ↓
Emotion-Aware Ciphertext
Dataset

Dataset used:

GoEmotions Dataset

58k+ labeled comments
27 emotion categories
Created by Google Research
Model Training
Baseline Models
Logistic Regression
LSTM
Transformer Models
DistilBERT
RoBERTa
Training Metrics
Accuracy
Precision
Recall
F1 Score
Sample Output
{
  "emotion": "Joy",
  "confidence": 0.91,
  "ciphertext": "U2FsdGVkX1..."
}
Tech Stack
Machine Learning
Python
PyTorch
Hugging Face Transformers
Scikit-learn
Frontend
React
Tailwind CSS
Framer Motion
Security
AES Encryption
CryptoJS
Future Work
Multi-language emotion detection
Real-time chat integration
Voice emotion analysis
Federated learning for privacy-preserving training
