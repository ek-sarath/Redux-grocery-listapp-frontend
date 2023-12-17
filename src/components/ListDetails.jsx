import React, { useState } from 'react';
import AddItem from './AddItem';
import ItemList from './ItemList';
import DoneList from './DoneList';

const ListDetails = ({ listName, appListId }) => {
  const [lists, setLists] = useState({
    [appListId]: [],
  });
  const [doneItems, setDoneItems] = useState({
    [appListId]: [],
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddItem = (item, listId) => {
    setLists((prevLists) => {
      const updatedList = [...(prevLists[listId] || []), item];
      return { ...prevLists, [listId]: updatedList };
    });

    if (editingIndex !== null) {
      setEditingIndex(null);
    }
  };

  const handleMarkDone = (index, listId) => {
    const markedItem = lists[listId][index];
    setDoneItems((prevDoneItems) => ({
      ...prevDoneItems,
      [listId]: [...(prevDoneItems[listId] || []), markedItem],
    }));
    setLists((prevLists) => ({
      ...prevLists,
      [listId]: prevLists[listId].filter((_, i) => i !== index),
    }));
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
  };

  const handleDeleteItem = (index, listId) => {
    setLists((prevLists) => ({
      ...prevLists,
      [listId]: prevLists[listId].filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h2>{listName}</h2>
      <AddItem
        onAdd={(item) => handleAddItem(item, appListId)}
        editingItem={editingIndex !== null ? lists[appListId][editingIndex] : null}
        appListId={appListId}
      />

      <div className='ItemDoneList'>
        <ItemList
          items={lists[appListId] || []}
          onMarkDone={(index) => handleMarkDone(index, appListId)}
          onEdit={handleEditItem}
          onDelete={(itemId) => handleDeleteItem(itemId, appListId)}
        />
        <DoneList items={doneItems[appListId] || []} />
      </div>
    </div>
  );
};

export default ListDetails;