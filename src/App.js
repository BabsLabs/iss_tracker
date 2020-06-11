import React from 'react';
import './App.scss';
import Mapbox from './components/Mapbox'
import InstructionPopup from './components/InstructionPopup';

function App() {
  const [showInstructions, setShowInstructions] = React.useState(false);
  const onClick = () => setShowInstructions(true);

  return (
    <div>
      <div onClick={onClick}>
        {showInstructions ? null : <InstructionPopup />}
      </div>
      <Mapbox />
    </div>
  );
}

export default App;
