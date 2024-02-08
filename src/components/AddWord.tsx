import React, { useState, useEffect } from 'react';

interface AddWordProps {
  onAdd: (word: string, type: string) => void;
}

const AddWord: React.FC<AddWordProps> = ({ onAdd }) => {
  const [word, setWord] = useState<string>('');
  const [wordType, setWordType] = useState<string>('');
  const [wordTypes, setWordTypes] = useState<string[]>([]);

  useEffect(() => {
    // Fetch word types when the component mounts
    fetchWordTypes();
  }, []);

  const fetchWordTypes = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/word-types`);
      if (!response.ok) {
        throw new Error('Failed to fetch word types');
      }
      const data = await response.json();
      setWordTypes(data[0]?.wordTypes || []);
    } catch (error:any) {
      console.error(`Error fetching word types: ${error.message}`);
    }
  };

  const handleAddWord = () => {
    // Validate inputs before adding
    if (!word.trim() || !wordType.trim()) {
      alert('Please enter both word and word type');
      return;
    }
    // Call the onAdd callback with word and wordType
    onAdd(word, wordType);
    // Clear the inputs after adding
    setWord('');
    setWordType('');
  };

  return (
    <div>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter word"
      />
      <select
        value={wordType}
        onChange={(e) => setWordType(e.target.value)}
      >
        <option value="">Select word type</option>
        {wordTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
      <button onClick={handleAddWord}>Add Word</button>
    </div>
  );
};

export default AddWord;
