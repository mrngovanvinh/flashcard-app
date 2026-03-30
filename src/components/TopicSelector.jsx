import React from "react";
import { Settings } from "lucide-react";

const TopicSelector = ({ topics, onSelect, onManage }) => {
  return (
    <div className="topic-selector-container">
      <h1 className="main-title">🌟 Thẻ Học Nhỏ Xinh 🌟</h1>
      <p className="subtitle">Chọn một chủ đề để bắt đầu học nhé!</p>
      
      <div className="topics-grid">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className="topic-card"
            style={{ "--topic-color": topic.color }}
            onClick={() => onSelect(topic)}
          >
            <div className="topic-icon-wrapper">
              <span className="topic-icon">{topic.icon}</span>
            </div>
            <h2 className="topic-title">{topic.titleVi}</h2>
            <p className="topic-subtitle">{topic.title}</p>
          </button>
        ))}
      </div>

      <footer className="selector-footer">
        <button className="manage-btn" onClick={onManage}>
          <Settings size={20} />
          <span>Quản lý Thẻ Học (Dành cho Ba Mẹ)</span>
        </button>
      </footer>
    </div>
  );
};

export default TopicSelector;
