import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItem = ({ onAdd, editingItem, appListId }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    if (editingItem) {
      setItemName(editingItem.name || '');
      setItemDescription(editingItem.description || '');
    }
  }, [editingItem]);

  useEffect(() => {
    if (itemId !== null) {
      fetchData(itemId);
    }
  }, [itemId]);

  const handleAddItem = async () => {
    if (itemName.trim() !== '') {
      try {
        const response = await axios.post(`http://localhost:8085/app-list/item?appListId=${appListId}`, {
          name: itemName,
          description: itemDescription,
        });

        const Item = response.data;

        if (Item.itemId) {
          const ItemId = Item.itemId;

          setItemId(ItemId);
          onAdd({ ...Item, ItemId });
          setItemName('');
          setItemDescription('');
          console.log('Item added successfully:', Item);

        
          fetchAllItems();
        } else {
          console.error('Response does not contain a valid item ID:', response.data);
        }
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  const fetchData = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:8085/app-list/items/${itemId}?appListId=${appListId}`);
      console.log('Fetched item data:', response.data);
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };

  const fetchAllItems = async () => {
    try {
      const allItemsResponse = await axios.get(`http://localhost:8085/app-list/items?appListId=${appListId}`);
      console.log('All items:', allItemsResponse.data);
    } catch (error) {
      console.error('Error fetching all items:', error);
    }
  };

  return (
    <div className='AddItems'>
      <input
        type="text"
        value={itemName}
        placeholder="Item Name"
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="text"
        value={itemDescription}
        placeholder="Description"
        onChange={(e) => setItemDescription(e.target.value)}
      />
      <button onClick={handleAddItem} className='AddItemButton'>
        {editingItem ? 'Update' : 'Add Item'}
      </button>
    </div>
  );
};

export default AddItem;