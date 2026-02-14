import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import {
    Sun,
    Moon,
    Sparkles,
    Download,
    RefreshCw,
    BookOpen,
    AlertCircle
} from 'lucide-react';
import FlashcardGrid from './components/FlashcardGrid';
import LoadingOverlay from './components/LoadingOverlay';

const API_URL = 'http://localhost:5000/api/generate-flashcards';

function App() {
    const [notes, setNotes] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleGenerate = async () => {
        if (!notes.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(API_URL, { notes });
            setFlashcards(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to generate flashcards. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('SnowLift AI - Flashcards', 20, 20);

        doc.setFontSize(12);
        flashcards.forEach((card, index) => {
            const yPos = 40 + (index * 30);
            if (yPos > 270) {
                doc.addPage();
                doc.text('Question: ' + card.question, 20, 20);
                doc.text('Answer: ' + card.answer, 20, 30);
            } else {
                doc.text(`${index + 1}. Q: ${card.question}`, 20, yPos);
                doc.text(`   A: ${card.answer}`, 20, yPos + 10);
            }
        });

        doc.save('flashcards.pdf');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 text-slate-900 dark:text-slate-100">
            {/* Header */}
            <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary-600 p-2 rounded-lg">
                            <Sparkles className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-sky-500">
                            HorizonCard AI
                        </h1>
                    </div>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold mb-4">Master Any Subject with AI</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Paste your notes below and let HorizonCard AI create perfect flashcards for you.
                    </p>
                </section>

                {/* Notes Input Area */}
                <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 mb-12">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 opacity-70">Study Notes</label>
                        <textarea
                            className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                            placeholder="Paste your biology notes, history facts, or coding snippets here..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <span className="text-sm opacity-50 flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {notes.length} characters
                        </span>

                        <button
                            onClick={handleGenerate}
                            disabled={loading || notes.length < 10}
                            className="w-full sm:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                        >
                            {loading ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                            ) : (
                                <Sparkles className="w-5 h-5" />
                            )}
                            {loading ? 'Generating...' : 'Generate Flashcards'}
                        </button>
                    </div>
                </section>

                {/* Error State */}
                {error && (
                    <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Results Area */}
                {flashcards.length > 0 && !loading && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-bold">Your Flashcards</h3>
                            <button
                                onClick={downloadPDF}
                                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                <Download className="w-5 h-5" />
                                Download PDF
                            </button>
                        </div>

                        <FlashcardGrid flashcards={flashcards} />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center opacity-50 text-sm">
                <p>© 2026 HorizonCard AI. Powered by OpenAI.</p>
            </footer>

            {/* Loading Overlay */}
            {loading && <LoadingOverlay />}
        </div>
    );
}

export default App;
