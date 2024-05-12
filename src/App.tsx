import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <FontAwesomeIcon icon={faGripVertical}/>Hello world!
    </h1>
  );
}

export default App;
