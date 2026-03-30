import React from "react";
import { RotateCw, Volume2 } from "lucide-react";

const Flashcard = ({ card, isFlipped, onFlip }) => {
  const playAudio = (e) => {
    e.stopPropagation(); // Prevent card from flipping when clicking audio
    
    // Stop any currently playing audio
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(card.vi);
    utterance.lang = "vi-VN";
    utterance.rate = 0.9; // slightly slower for kids
    
    // Explicitly try to find a native Vietnamese voice
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(voice => voice.lang === "vi-VN" || voice.lang.includes("vi"));
    if (viVoice) {
      utterance.voice = viVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flashcard-scene" onClick={onFlip}>
      <div className={`flashcard ${isFlipped ? "is-flipped" : ""}`}>
        
        {/* FRONT: Image or Emoji */}
        <div className="flashcard-face flashcard-front">

          <div className="card-visual" style={card.id === 'cat' ? { backgroundColor: '#FFD166', borderRadius: '24px' } : {}}>
            {card.image ? (
              <img 
                src={card.image} 
                alt={card.en} 
                className="card-image" 
                style={card.id === 'cat' ? { mixBlendMode: 'multiply' } : {}} 
              />

            ) : (
              <span className="card-emoji">{card.emoji}</span>
            )}
          </div>
          <button className="audio-btn" onClick={playAudio} aria-label="Listen">
            <Volume2 size={32} />
          </button>
          <div className="flip-hint">
            <RotateCw size={24} />
            <span>Chạm để lật</span>
          </div>
        </div>

        {/* BACK: Vocabulary */}
        <div className="flashcard-face flashcard-back">
          <div className="vocab-vi">{card.vi}</div>
          <div className="vocab-en">{card.en}</div>
          <button className="audio-btn" onClick={playAudio} aria-label="Listen">
            <Volume2 size={32} />
          </button>
          <div className="flip-hint">
            <RotateCw size={24} />
            <span>Trở lại</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Flashcard;
