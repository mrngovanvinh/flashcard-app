import React, { useState, useEffect } from 'react';
import topicsData from './data/topics.json';
import TopicSelector from './components/TopicSelector';
import FlashcardViewer from './components/FlashcardViewer';
import Dashboard from './components/Dashboard';

function App() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isManaging, setIsManaging] = useState(false);

  // Initialize topics from localStorage or fallback to default JSON
  useEffect(() => {
    const savedTopics = localStorage.getItem('flashcards_topics');
    if (savedTopics) {
      setTopics(JSON.parse(savedTopics));
    } else {
      setTopics(topicsData);
    }
  }, []);

  // Save to localStorage whenever topics change
  useEffect(() => {
    if (topics.length > 0) {
      localStorage.setItem('flashcards_topics', JSON.stringify(topics));
    }
  }, [topics]);

  const handleUpdateTopics = (newTopics) => {
    setTopics(newTopics);
  };

  return (
    <div className="app-root">
      {isManaging ? (
        <Dashboard 
          topics={topics} 
          onUpdate={handleUpdateTopics} 
          onClose={() => setIsManaging(false)} 
        />
      ) : selectedTopic ? (
        <FlashcardViewer 
          topic={selectedTopic} 
          onBack={() => setSelectedTopic(null)} 
        />
      ) : (
        <TopicSelector 
          topics={topics} 
          onSelect={setSelectedTopic} 
          onManage={() => setIsManaging(true)}
        />
      )}
    </div>
  );
}

export default App;
