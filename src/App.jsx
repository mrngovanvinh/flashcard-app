import React, { useState } from 'react';
import topicsData from './data/topics.json';
import TopicSelector from './components/TopicSelector';
import FlashcardViewer from './components/FlashcardViewer';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="app-root">
      {selectedTopic ? (
        <FlashcardViewer 
          topic={selectedTopic} 
          onBack={() => setSelectedTopic(null)} 
        />
      ) : (
        <TopicSelector 
          topics={topicsData} 
          onSelect={setSelectedTopic} 
        />
      )}
    </div>
  );
}

export default App;
