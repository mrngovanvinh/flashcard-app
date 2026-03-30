import React, { useState, useRef } from "react";
import Flashcard from "./Flashcard";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

const FlashcardViewer = ({ topic, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Touch/Swipe state
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const currentCard = topic.cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % topic.cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + topic.cards.length) % topic.cards.length);
    }, 150);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only treat as a horizontal swipe if horizontal movement > vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        handleNext(); // Swipe left → next card
      } else {
        handlePrev(); // Swipe right → previous card
      }
    } else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      // If the user tapped a button (like audio), don't flip the card
      if (e.target.closest('button')) {
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }
      
      // It was a tap elsewhere → flip the card
      setIsFlipped((prev) => !prev);
    }

    touchStartX.current = null;
    touchStartY.current = null;
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

      <main 
        className="viewer-main"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Flashcard 
          card={currentCard} 
          isFlipped={isFlipped} 
          onFlip={() => setIsFlipped(!isFlipped)} 
        />
        <p className="swipe-hint">← Vuốt để chuyển thẻ →</p>
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

const RotateCwIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
);

export default FlashcardViewer;
