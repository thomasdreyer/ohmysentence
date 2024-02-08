import React, { useEffect } from 'react';

interface TypeGridProps {
  setWordTypes: (wordTypes: string[]) => void;
  getWords: (type: string) => void;
  wordTypes: string[];
}

const TypeGridComponent: React.FC<TypeGridProps> = ({ setWordTypes, getWords, wordTypes }) => {
  useEffect(() => {
    const fetchWordTypes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/word-types`);
        if (!response.ok) {
          throw new Error('Failed to fetch word types');
        }
        const data = await response.json();
        setWordTypes(data[0]?.wordTypes || []);
      } catch (error: any) { // Explicitly type the error
        console.error(`Error fetching word types: ${(error as Error).message}`); // Cast error to Error and access message
        // Handle error state here if needed
      }
    };

    fetchWordTypes();
  }, [setWordTypes]);

  return (
    <div className="grid-container">
      {wordTypes.length > 0 ? (
        wordTypes.map((type, index) => (
          <div key={index} className="grid-item" onClick={() => getWords(type)}>
            {type}
          </div>
        ))
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default TypeGridComponent;
