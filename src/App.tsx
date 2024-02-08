import React, { useState } from 'react';
import './App.css';

import TypeGridComponent from './components/TypeGridComponent';
import WordGridComponent from './components/WordGridComponent';
import AddWord from './components/AddWord';


const App: React.FC = () => {
  const [wordType, setWordType] = useState<string>('');
  const [wordTypes, setWordTypes] = useState<string[]>([]);
  const [sentence, setSentence] = useState<string>('');
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showWordGrid, setShowWordGrid] = useState<boolean>(false);
  const [addWord, setAddWord] = useState<boolean>(false);

  const addChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.code === "Space" || e.keyCode === 32) {
      setShowGrid(true);
    }
  };

  const getWordsFromType = async (type: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/word-list/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setWordTypes(data.map((w: any) => w.word));
      setWordType(type); // Set the selected word type
    } catch (error:any) {
      console.error(`Error fetching data: ${error.message}`);
      // Handle error state here if needed
    }
    setShowGrid(false);
    setShowWordGrid(true);
  };
  

  const addWordToSentence = (word: string) => {
    const updatedSentence = `${sentence} ${word}`;
    setSentence(updatedSentence);
    setShowWordGrid(false);
  };

  const submitSentence = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/submit-sentence`, {
      method: "POST",
      body: JSON.stringify({ sentence }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to submit sentence');
      }
      return res.json();
    })
    .then(data => {
      alert(data.message); // Alert the data returned from the server
    })
    .catch(err => {
      alert(err.message); // Alert the error message
    });
  };
  
  const addAWord = (word: string, type: string) : void  =>{
 fetch(`${process.env.REACT_APP_API_BASE_URL}/api/add-word`, {
  method: "POST",
  body: JSON.stringify({ word,type }),
  headers: {
    "Content-Type": "application/json"
  }
})
.then(res => {
  if (!res.ok) {
    throw new Error('Failed to submit word');
  }
  return res.json();
})
.then(data => {
  alert(data.message); 
})
.catch(err => {
  alert(err.message); 
});
setAddWord(false);
  }

  return (
    <div className="App">
     
     { addWord ?  <AddWord onAdd={(word,type)=>addAWord(word,type) }/> : null}



      <span>{ wordType !== '' ? `Current word type is a ${wordType}` : null}</span>
      <input
        type="text"
        value={sentence}
        onKeyUp={addChar}
        onChange={(e) => setSentence(e.target.value)}
        className="sentence"
        data-testid="sentence"
      />
      <div className="btnsRow">
      <button onClick={() => { setShowGrid(true); setShowWordGrid(false); }}>SHOW WORD TYPE GRID</button>
      <button onClick={() => { setShowGrid(false); setShowWordGrid(true); }}>SHOW WORD GRID</button>
      <button onClick={()=>setAddWord(true)}>ADD A WORD</button>
      <button onClick={submitSentence}>SUBMIT SENTENCE</button>
      </div>
      

      {showGrid && (
        <TypeGridComponent
          setWordTypes={setWordTypes}
          getWords={getWordsFromType}
          wordTypes={wordTypes}
        />
      )}

      {showWordGrid && (
        <WordGridComponent
          type={wordType}
          addWord={addWordToSentence}
        />
      )}
    </div>
  );
};

export default App;
