 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardList from './CardList';
import ListDetails from './ListDetails';
import AddList from './AddList';

import '../App.css';

const GroceryListApp = () => {
  const [selectedList, setSelectedList] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8085/app-list/sorted');
      setLists(response.data);
      console.log('All List Data fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchListDetails = async (listId) => {
        try {
          const response = await axios.get(`http://localhost:8085/app-list/${listId}`);
          console.log('New List data fetched successfully:', response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching list details:', error);
        }
      };
    
      const handleListClick = async (list) => {
        setSelectedList(await fetchListDetails(list.appListId));
      };

  const handleDeleteList = async (list) => {
    try {
      await axios.delete(`http://localhost:8085/app-list/${list.appListId}`);
      setLists((prevLists) => prevLists.filter((l) => l.appListId !== list.appListId));
      setSelectedList(null);
      console.log('List deleted successfully:', list);
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const handleEditListName = async (list) => {
    const newName = prompt('Enter new name:', list.name);
    if (newName) {
      try {
        await axios.put(`http://localhost:8085/app-list/app/${list.appListId}`, { name: newName });
        setLists((prevLists) =>
          prevLists.map((l) => (l.appListId === list.appListId ? { ...l, name: newName } : l))
        );
        console.log('List updated successfully:', list.appListId, newName);
      } catch (error) {
        console.error('Error editing list name:', error);
      }
    }
  };


  const handleAddList = async (listName) => {
    if (listName) {
      try {
        const response = await axios.post('http://localhost:8085/app-list', {
          name: listName,
        });

        const newList = { appListId: response.data.appListId, name: response.data.name };
        setLists((prevLists) => [...prevLists, newList]);

        console.log('List added successfully:', newList);
        fetchData();
      } catch (error) {
        console.error('Error adding list:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>List Manager App</h1>
      <div className="list-container">
      <AddList onAdd={handleAddList} />
        {lists.map((list) => (
          <CardList
            key={list.appListId}
            name={list.name}
            onClick={() => handleListClick(list)}
            onDelete={() => handleDeleteList(list)}
            onEdit={() => handleEditListName(list)}
          />
        ))}

      </div>
      {selectedList && <ListDetails listName={selectedList.name} appListId={selectedList.appListId} />}
    </div>
  );
};

export default GroceryListApp;



















