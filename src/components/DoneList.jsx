import React from 'react';

const DoneList = ({items}) => {
  return (
      <div className='DoneList'>
      <h3>Done List</h3>
      <ul className="Vblee">
        {items.map((item, index) => (
          <li key={index} className="Kblee">
            <span className="line-through">{item.name}</span>
            {item.description && (
              <p>({item.description})</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoneList;
