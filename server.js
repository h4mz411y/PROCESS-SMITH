const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;


app.use(cors());

app.use(bodyParser.json());

// In-memory storage for cards
let cards = [
  { id: 1, name: 'Task-1', status: 'To Do' },
  { id: 2, name: 'Task-2', status: 'In Progress' },
  { id: 3, name: 'Task-3', status: 'Completed' },
];

// Get all the cards
app.get('/api/cards', (req, res) => {
  res.json(cards);
});

// Create New card
app.post('/api/cards', (req, res) => {
  const { name, status } = req.body;
  const newCard = { id: cards.length + 1, name, status };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// Start 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.put('/api/cards/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const cardIndex = cards.findIndex((card) => card.id === parseInt(id));

  if (cardIndex !== -1) {
    cards[cardIndex].status = status;
    res.json(cards[cardIndex]);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});