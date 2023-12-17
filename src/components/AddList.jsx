import React, { useState } from 'react';
import '../App.css';

const AddList = ({ onAdd }) => {
  const [listName, setListName] = useState('');

  const handleAddList = () => {
    onAdd(listName || 'New Card');
    setListName('');
  };

  return (
    <div className="add-list">
      <button className="add-list-button" onClick={handleAddList}>
        +
      </button>
    </div>
  );
};

export default AddList;