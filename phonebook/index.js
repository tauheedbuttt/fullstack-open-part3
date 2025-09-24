const express = require("express");

const PORT = 3001;
const app = express();

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  return res.status(200).json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = persons.find((item) => item.id === id);
  if (!person) return res.status(404).send("Person not found");

  return res.status(200).json(person);
});

app.get("/info", (req, res) => {
  return res.send(`
    <div>
        <div>Phonebook has info for ${persons.length} people</div><br/>
        <div>${new Date()}</div><br/>
    </div>
    `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
