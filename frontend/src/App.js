import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  const [newCardStatus, setNewCardStatus] = useState('To Do');

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cards');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleAddCard = async () => {
    if (newCardName.trim() === '') {
      return;
    }

    const newCard = {
      name: newCardName,
      status: newCardStatus,
    };

    try {
      await axios.post('http://localhost:5000/api/cards', newCard);
      setNewCardName('');
      setNewCardStatus('To Do');
      fetchCards();
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('text/plain', cardId);
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');

    const updatedCards = cards.map((card) => {
      if (card.id.toString() === cardId) {
        card.status = status;
      }
      return card;
    });

    try {
      await axios.put(`http://localhost:5000/api/cards/${cardId}`, { status });
      setCards(updatedCards);
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>

      <div className="add-card">
        <input
          type="text"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
          placeholder="Card Name"
        />
        <select
          value={newCardStatus}
          onChange={(e) => setNewCardStatus(e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleAddCard}>Add New Card</button>
      </div>

      <div className="card-container">
        <div
          className="column"
          onDrop={(e) => handleDrop(e, 'To Do')}
          onDragOver={handleDragOver}
        >
          <h2>To Do</h2>
          {cards
            .filter((card) => card.status === 'To Do')
            .map((card) => (
              <div
                className="card"
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, card.id)}
              >
                <h3>{card.name}</h3>
                <p>Status: {card.status}</p>
              </div>
            ))}
        </div>

        <div
          className="column"
          onDrop={(e) => handleDrop(e, 'In Progress')}
          onDragOver={handleDragOver}
        >
          <h2>In Progress</h2>
          {cards
            .filter((card) => card.status === 'In Progress')
            .map((card) => (
              <div
                className="card"
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, card.id)}
              >
                <h3>{card.name}</h3>
                <p>Status: {card.status}</p>
              </div>
            ))}
        </div>

        <div
          className="column"
          onDrop={(e) => handleDrop(e, 'Completed')}
          onDragOver={handleDragOver}
        >
          <h2>Completed</h2>
          {cards
            .filter((card) => card.status === 'Completed')
            .map((card) => (
              <div
                className="card"
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, card.id)}
              >
                <h3>{card.name}</h3>
                <p>Status: {card.status}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
