import React from 'react';
import '../App.css';

const CardList = ({ name, onClick, onDelete, onEdit }) => {
  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      onDelete();
    }
  };

  return (
    <div className="card" onClick={onClick}>
      <div>
        <strong>{name}</strong>
      </div>
      <button onClick={confirmDelete} className='DeleteButton'>
        Delete
      </button>
      <button onClick={onEdit} className='EditButton'>
        Edit
      </button>
    </div>
  );
};

export default CardList;