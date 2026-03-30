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
  const DATA_VERSION = "2.0"; // Increment this when topics.json changes significantly

  useEffect(() => {
    const savedTopics = localStorage.getItem('flashcards_topics');
    const savedVersion = localStorage.getItem('flashcards_version');
    
    // If no saved data OR version mismatch (e.g. we added 20 new topics), load from JSON
    if (!savedTopics || savedVersion !== DATA_VERSION) {
      setTopics(topicsData);
      localStorage.setItem('flashcards_version', DATA_VERSION);
    } else {
      setTopics(JSON.parse(savedTopics));
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
