import { useState } from 'react';
import './App.css';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Marvel Comics Explorer</h1>
      </header>
      <main className="App-main">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <CharacterList onCharacterSelect={handleCharacterSelect} />
            </div>
            <div className="col-md-8">
              {selectedCharacter ? (
                <CharacterDetail character={selectedCharacter} />
              ) : (
                <div className="welcome-message">
                  <h2>Welcome to Marvel Comics Explorer</h2>
                  <p>Select a character from the list to view their details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
