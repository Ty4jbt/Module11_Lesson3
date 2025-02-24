import { useState } from 'react'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import './App.css'

function App() {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  console.log('App rendering with selectedCharacterId:', selectedCharacterId);

  return (
    <div className="app">
      <h1>Marvel Characters</h1>
      <div className="content">
        <CharacterList onSelectCharacter={(id) => {
          console.log('Character selected:', id)
          setSelectedCharacterId(id)
        }} />
        {selectedCharacterId && (
          <CharacterDetail
            key={selectedCharacterId}
            characterId={selectedCharacterId}
          />
        )}
      </div>
    </div>
  );
}

export default App
