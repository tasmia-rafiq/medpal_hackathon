# 🩺 MedPal

Don’t know where to store all your medical reports or how to access the right information when needed? Don’t worry — we’ve got you.

MedPal simplifies complex medical jargon into easy-to-understand summaries. It checks whether your medical values fall within normal ranges and suggests actionable next steps, helping you seek timely assistance from medical professionals. It also organizes your reports and lets you query them when needed using a RAG (Retrieval-Augmented Generation) system.

---

## Demo Video 
[Video](https://youtu.be/96GszsVYURY?si=DnkKhzl5yr3c2tUb)


## 🧠 Key Features

- **Medical Report Analysis**  
  Upload your medical reports and let MedPal extract and interpret the values for you.

- **Range Evaluation**  
  Understand whether your results fall within normal ranges.

- **Actionable Insights**  
  Receive easy-to-follow suggestions on next steps and which healthcare professionals to consult.

- **Report Storage**  
  Store all your reports in one place for easy access.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js** – Frontend framework

### Backend
- **Next.js** – Backend server (API routes)
- **CohereAI** – Embeddings
- **Qdrant** – Vector database for semantic search
- **Groq** – Large Language Model (LLM) for generating answers

---

## 🚀 How It Works

1. **Sign in with Google**
2. **Upload a PDF file**
3. **Ask questions about your report** using RAG
4. **View and manage your report history**

---

## 📦 Installation

- [For environment setup to run locally](RUN.md)
