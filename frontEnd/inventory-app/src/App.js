import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '', price: '' });
  const [editing, setEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: '', name: '', price: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:8080/api/items');
    setItems(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editing) {
      setCurrentItem({ ...currentItem, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/items', newItem);
    fetchItems();
    setNewItem({ id: '', name: '', price: '' });
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/items/${currentItem.id}`, currentItem);
    fetchItems();
    setEditing(false);
    setCurrentItem({ id: '', name: '', price: '' });
  };

  const editItem = (item) => {
    setEditing(true);
    setCurrentItem({ id: item.id, name: item.name, price: item.price });
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8080/api/items/${id}`);
    fetchItems();
  };

  
  return (
    <div className='App'>
      <h1>Inventory Application</h1>
      {editing ? (
        <form onSubmit={handleEditItem}>
          <h2>Edit Item</h2>
          <label>ID</label>
          <input
            type="text"
            name="id"
            value={currentItem.id}
            onChange={handleInputChange}
            readOnly
          />
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={currentItem.name}
            onChange={handleInputChange}
          />
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={currentItem.price}
            onChange={handleInputChange}
          />
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          <button type="submit">Update Item</button>
        </form>
      ) : (
        <form onSubmit={handleAddItem}>
          <h2>Add Item</h2>
          <label>ID</label>
          <input
            type="text"
            name="id"
            value={newItem.id}
            onChange={handleInputChange}
          />
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
          />
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={newItem.price}
            onChange={handleInputChange}
          />
          <button type="submit">Add Item</button>
        </form>
      )}
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
            <button onClick={() => editItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
