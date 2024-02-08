import React, { useState, useEffect, useCallback } from 'react';

interface WordGridProps {
  type: string;
  addWord: (word: string) => void;
}

const WordGridComponent: React.FC<WordGridProps> = ({ type, addWord }) => {
  const [words, setWords] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/word-list/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setWords(data);
    } catch (error:any) {
      console.error(`Error fetching data: ${error.message}`);
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [fetchData, type]);

  return (
    <div className="grid-container">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <>
          {words.map((word:any, index:number) => (
            <div key={word._id || index} className="grid-item" onClick={() => addWord(word.word)} data-testid={`word-${index}`}>
              {word.word}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default WordGridComponent;
