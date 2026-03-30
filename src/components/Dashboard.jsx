import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, ChevronRight, ArrowLeft } from 'lucide-react';

const Dashboard = ({ topics, onUpdate, onClose }) => {
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const selectedTopic = topics.find(t => t.id === selectedTopicId);

  // TOPIC CRUD
  const addTopic = () => {
    const name = prompt("Tên chủ đề (Tiếng Việt):");
    const enName = prompt("Topic Name (English):") || name;
    if (!name) return;
    
    const newTopic = {
      id: `topic_${Date.now()}`,
      title: enName,
      titleVi: name,
      color: "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'), // Random color
      icon: "📁",
      cards: []
    };
    onUpdate([...topics, newTopic]);
  };

  const deleteTopic = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa chủ đề này không?")) {
      onUpdate(topics.filter(t => t.id !== id));
      if (selectedTopicId === id) setSelectedTopicId(null);
    }
  };

  // CARD CRUD
  const addCard = () => {
    const vi = prompt("Từ Tiếng Việt:");
    const en = prompt("English Word:");
    const emoji = prompt("Emoji (ví dụ: 🍎):") || "❓";
    if (!vi || !en) return;

    const newTopics = topics.map(t => {
      if (t.id === selectedTopicId) {
        return {
          ...t,
          cards: [...t.cards, { id: `card_${Date.now()}`, vi, en, emoji, image: null }]
        };
      }
      return t;
    });
    onUpdate(newTopics);
  };

  const deleteCard = (cardId) => {
    const newTopics = topics.map(t => {
      if (t.id === selectedTopicId) {
        return {
          ...t,
          cards: t.cards.filter(c => c.id !== cardId)
        };
      }
      return t;
    });
    onUpdate(newTopics);
  };

  return (
    <div className="dashboard-overlay">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <button className="back-link-btn" onClick={onClose}>
            <ArrowLeft size={20} /> Quay lại App
          </button>
          <h1>Quản lý Thẻ Học</h1>
          <button className="close-dash-btn" onClick={onClose}><X size={24} /></button>
        </header>

        <div className="dashboard-main">
          {/* TOPICS LIST */}
          <aside className="topics-sidebar">
            <div className="sidebar-header">
              <h2>Chủ đề</h2>
              <button className="add-small-btn" onClick={addTopic}><Plus size={18} /></button>
            </div>
            <div className="sidebar-list">
              {topics.map(t => (
                <div 
                  key={t.id} 
                  className={`sidebar-item ${selectedTopicId === t.id ? 'active' : ''}`}
                  onClick={() => setSelectedTopicId(t.id)}
                >
                  <span className="item-icon">{t.icon}</span>
                  <span className="item-text">{t.titleVi}</span>
                  <button className="delete-mini-btn" onClick={(e) => { e.stopPropagation(); deleteTopic(t.id); }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </aside>

          {/* CARDS LIST */}
          <main className="cards-manager">
            {selectedTopic ? (
              <>
                <div className="manager-header">
                  <div className="topic-info">
                    <span className="badge">{selectedTopic.title}</span>
                    <h2>Thẻ trong: {selectedTopic.titleVi}</h2>
                  </div>
                  <button className="add-card-btn" onClick={addCard}>
                    <Plus size={20} /> Thêm Thẻ Mới
                  </button>
                </div>
                
                <div className="cards-table">
                  <div className="table-header">
                    <span>Hình/Emoji</span>
                    <span>Tiếng Việt</span>
                    <span>English</span>
                    <span>Hành động</span>
                  </div>
                  <div className="table-body">
                    {selectedTopic.cards.length === 0 ? (
                      <div className="empty-state">Chủ đề này chưa có thẻ nào. Hãy thêm thẻ mới nhé!</div>
                    ) : (
                      selectedTopic.cards.map(card => (
                        <div key={card.id} className="table-row">
                          <span className="row-emoji">{card.emoji}</span>
                          <span className="row-vi">{card.vi}</span>
                          <span className="row-en">{card.en}</span>
                          <div className="row-actions">
                            <button className="delete-mini-btn" onClick={() => deleteCard(card.id)}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="selection-prompt">
                <ChevronRight size={48} />
                <p>Chọn một chủ đề bên trái để bắt đầu quản lý các thẻ học!</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
