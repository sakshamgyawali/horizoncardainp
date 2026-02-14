# HorizonCard AI - AI Flashcard Generator

HorizonCard AI is a modern web application that transforms your study notes into interactive 3D flashcards using OpenAI's powerful language models.

## 🚀 Features

- **AI-Powered Generation**: Instantly create 5-10 flashcards from any text.
- **3D Flip Effect**: Interactive CSS-based 3D flip animation for a premium feel.
- **Dark Mode**: Work comfortably in any environment.
- **Export to PDF**: Save your flashcards for offline study.
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop.
- **Structured AI Logic**: Reliable JSON parsing with automatic retry mechanism.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, OpenAI API.
- **PDF Generation**: jsPDF.

## 📋 Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- OpenAI API Key

### 2. Backend Configuration
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Add your OpenAI API Key to the `.env` file:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   *Server will run on http://localhost:5000*

### 3. Frontend Configuration
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *App will be available at http://localhost:5173 (or similar)*

## 📂 Project Structure

```text
horizoncard-ai/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── server.js      # Express app with OpenAI logic
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FlashcardGrid.jsx
    │   │   └── LoadingOverlay.jsx
    │   ├── App.jsx    # Main application logic
    │   ├── index.css  # Global styles & Tailwind
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🔒 Security
- The OpenAI API key is stored securely in the backend `.env` file.
- The frontend communicates only with the local proxy, ensuring no keys are exposed in the browser.
- CORS is enabled to allow frontend-backend communication.

## 📄 License
MIT
