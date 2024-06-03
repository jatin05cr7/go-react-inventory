
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
  const handleInputChange = () => {
    const { name, value } = e.target
    setNewItem({ ...newItem, [name]: value })
  }
  const handleEditing = async () => {
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
  const deleteItems = async () => {
    await axios.delete(`/http://localhost:8080/api/items/${id}`,)
    
  }
  return (<div className='App'>
    
    <h1>Inventory Application</h1>
    {editing ? (<form onSubmit={updateItem}>
      <h2>Edit Item</h2>
      <label>ID</label>
      <input type="text" name="id" value={curremtItem.id} onChange={handleEditing} readOnly/>
    
    
    
  


    </form>):(<form></form>)}
  </div>)

}

export default App;
