
import './App.css';
import React ,{useState,useEffect} from 'react'
import axios from 'axios';

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState([])
  const [editing, setEditing] = useState([])
  const [currentItem, setCurrentItem] = useState([])
  useEffect(() => {
    fetchItems()
  }, [])
  const fetchItems = async () => {
    const response = await axios.get("http://localhost:8080/api/items")
    setItems(response.data)
    
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewItem({ ...newItem, [name]: value })
  }
  const handleEditing = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/items", newItem)
    fetchItems();
    setNewItem({ id: "", name: "", price: "" })
    
  }
  const editItem = (item) => {
    setEditing(true)
    setCurrentItem({ id: item.id, name: item.name, price: item.price })
  }
  const updateItem = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/items/${currentItem.id}`, currentItem)
    fetchItems()
    setCurrentItem({ id: '', name: '', price: '' })
    
  }

  const addItem = async (e) => { 
    e.preventDefault()
    await axios.post("http://localhost:8080/api/items", newItem)
    fetchItems()
    setNewItem({id:'',name:'',price:''})
  }

  const deleteItems = async (id) => {
    await axios.delete(`/http://localhost:8080/api/items/${id}`,)
    
  }
  return (<div className='App'>
    
    <h1>Inventory Application</h1>
    {editing ? (<form onSubmit={updateItem}>
      <h2>Edit Item</h2>
      <label>ID</label>
      <input type="text" name="id" value={currentItem.id} onChange={handleEditing} readOnly />
      <label>Name</label>
      <input type="text" name="name" value={currentItem.name} onChange={handleEditing} />
      <label>Price</label>
      <input type="text" name="price" value={currentItem.price} onChange={handleEditing} />
      <button type="submit">Update Item</button>
      <button onClick={()=>(setEditing(false))}>Cancel</button>
    </form>) : (<form onSubmit={addItem}>
        <h2>Add Item</h2>
        <label>ID</label>
        <input type="text" name="id" value={newItem.id} onChange={handleInputChange} />
        <label>Name</label>
        <input type="text" name="name" value={newItem.name} onChange={handleInputChange} />
        <label>Price</label>
        <input type="text" name="price" value={newItem.price} onChange={handleInputChange} />
        <button type="submit">Add Item</button>
    </form>)}
    <h2>Items List </h2>
    <ul>
      {items.map((item) =>
        <li key={item.id}>
          {item.name}{item.price}
          <button onClick={()=>editItem(item)}>Edit</button>
          <button onClick={()=>deleteItems(item.id)}>Delete</button>
        </li>
        
  )}

    </ul>
  </div>)

}

export default App;
