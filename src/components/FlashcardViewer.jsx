import React, { useState } from "react";
import Flashcard from "./Flashcard";
import { ArrowLeft, ChevronLeft, ChevronRight, Home } from "lucide-react";

const FlashcardViewer = ({ topic, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = topic.cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % topic.cards.length);
    }, 150); // slight delay for animation smoothness
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + topic.cards.length) % topic.cards.length);
    }, 150);
  };

  const activeColor = topic.color;

  return (
    <div className="viewer-container" style={{ "--active-color": activeColor }}>
      <header className="viewer-header">
        <button className="nav-btn icon-btn" onClick={onBack}>
          <Home size={28} />
        </button>
        <div className="progress-bar-container">
          <div className="progress-text">
            {topic.icon} {topic.titleVi} ({currentIndex + 1} / {topic.cards.length})
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex + 1) / topic.cards.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      <main className="viewer-main">
        <Flashcard 
          card={currentCard} 
          isFlipped={isFlipped} 
          onFlip={() => setIsFlipped(!isFlipped)} 
        />
      </main>

      <footer className="viewer-controls">
        <button className="nav-btn large-nav" onClick={handlePrev}>
          <ChevronLeft size={48} />
        </button>
        <button 
          className="nav-btn loud-btn" 
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <RotateCwIcon /> Lật Thẻ
        </button>
        <button className="nav-btn large-nav" onClick={handleNext}>
          <ChevronRight size={48} />
        </button>
      </footer>
    </div>
  );
};

// Quick inline icon component to avoid adding another lucide import if they want to
const RotateCwIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
);

export default FlashcardViewer;
