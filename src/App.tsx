import React from 'react';
import './App.css';
import DragAndDropSortPage from './page/dnd-sort/DragAndDropSortPage';
import TransitionPage from './page/css/TransitionPage';

function App() {
  return (
    <div className="mx-auto w-1/2">
      <DragAndDropSortPage />

      <TransitionPage />
    </div>
  );
}

export default App;
