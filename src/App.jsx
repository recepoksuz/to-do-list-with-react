import React, { useEffect, useState } from 'react';
import { InputGroup, Button, Form, FormControl, ListGroup, ListGroupItem, CloseButton } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/style.css"


function App() {
  const [itemValue, setItemValue] = useState()
  const [items, setItems] = useState([])

  const localItemsStorage = localStorage.getItem("items")
  
  useEffect(() => {
    if (localItemsStorage) {
      const parsedData = JSON.parse(localItemsStorage)
      setItems(parsedData)
    }
  }, [])

  function addItem() {
    if (itemValue === "") {
      return alert("Lütfen bir to do giriniz!")
    }
    const item = {
      id: Math.floor(Math.random() * 10000),
      value: itemValue
    }
    setItems([...items, item])
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    console.log(items)
  }, [items])

  function deleteItem(id) {
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)
  }

  function removeItems() {
    const removeList = []
    setItems(removeList)
    localStorage.clear();
  }


  return (
    <div className="App mx-5">
      <div className='appBody'>
        <Card>
          <Card.Header as="h5">To Do Ekle</Card.Header>
          <InputGroup className="p-3">
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder='To Do Giriniz'
              onChange={(event) => setItemValue(event.target.value)}
            />
          </InputGroup>
          <Card.Body>
            <Button variant="success" onClick={() => addItem()}>To Do Ekle</Button>
          </Card.Body>
        </Card>
        {/* To Do Add Area end */}

        <div className="todoListArea mt-3">
          <Card>
            <Card.Header>To Do Listesi</Card.Header>
            <ListGroup>
              {items.map((item) => (
                <ListGroup.Item key={item.id} action>
                  <div className='d-flex justify-content-between'>
                    {item.value}
                    <CloseButton onClick={() => deleteItem(item.id)} />
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Body>
              <Button className='mt-3' variant="danger" onClick={() => removeItems()}>Tüm To Do Listesini Sil</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
