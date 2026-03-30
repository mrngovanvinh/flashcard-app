import React from "react";
import { RotateCw, Volume2 } from "lucide-react";

const Flashcard = ({ card, isFlipped, onFlip }) => {
  const speak = (text, lang) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === lang || v.lang.startsWith(lang.split('-')[0]));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  const playViAudio = (e) => {
    e.stopPropagation();
    speak(card.vi, "vi-VN");
  };

  const playEnAudio = (e) => {
    e.stopPropagation();
    speak(card.en, "en-US");
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

          <div className="audio-btn-row">
            <button className="audio-btn audio-vi" onClick={playViAudio} aria-label="Nghe tiếng Việt" title="Tiếng Việt 🇻🇳">
              <Volume2 size={26} />
              <span className="audio-label">VI</span>
            </button>
            <button className="audio-btn audio-en" onClick={playEnAudio} aria-label="Listen in English" title="English 🇬🇧">
              <Volume2 size={26} />
              <span className="audio-label">EN</span>
            </button>
          </div>

          <div className="flip-hint">
            <RotateCw size={24} />
            <span>Chạm để lật</span>
          </div>
        </div>

        {/* BACK: Vocabulary */}
        <div className="flashcard-face flashcard-back">
          <div className="vocab-vi">{card.vi}</div>
          <div className="vocab-en">{card.en}</div>
          <div className="audio-btn-row">
            <button className="audio-btn audio-vi back-audio" onClick={playViAudio} aria-label="Nghe tiếng Việt" title="Tiếng Việt 🇻🇳">
              <Volume2 size={26} />
              <span className="audio-label">VI</span>
            </button>
            <button className="audio-btn audio-en back-audio" onClick={playEnAudio} aria-label="Listen in English" title="English 🇬🇧">
              <Volume2 size={26} />
              <span className="audio-label">EN</span>
            </button>
          </div>
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
