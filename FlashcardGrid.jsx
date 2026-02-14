import React, { useState } from 'react';

const Flashcard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="perspective-1000 h-64 w-full"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
                {/* Front */}
                <div className="flashcard-front bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-primary-500">
                        Question
                    </div>
                    <p className="text-xl font-semibold leading-relaxed">
                        {question}
                    </p>
                    <div className="absolute bottom-4 text-xs opacity-40">
                        Click to flip
                    </div>
                </div>

                {/* Back */}
                <div className="flashcard-back bg-primary-600 text-white border border-primary-500">
                    <div className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest opacity-70">
                        Answer
                    </div>
                    <p className="text-xl font-medium leading-relaxed">
                        {answer}
                    </p>
                    <div className="absolute bottom-4 text-xs opacity-70">
                        Click to flip back
                    </div>
                </div>
            </div>
        </div>
    );
};

const FlashcardGrid = ({ flashcards }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flashcards.map((card, index) => (
                <Flashcard key={index} {...card} />
            ))}
        </div>
    );
};

export default FlashcardGrid;
