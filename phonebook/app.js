const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (req, res) => {
  return res.send(`
    <div>
        <div>Phonebook has info for ${persons.length} people</div><br/>
        <div>${new Date()}</div><br/>
    </div>
    `);
});

let persons = [
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
  if (!person) return res.status(404).send({ error: "Person not found" });

  return res.status(200).json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = persons.find((item) => item.id === id);
  if (!person) return res.status(404).send({ error: "Person not found" });

  persons = persons.filter((p) => p.id !== id);

  return res.status(204).send();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name) return res.status(400).json({ error: "name is missing" });
  if (!number) return res.status(400).json({ error: "number is missing" });

  const existing = persons.find((p) => p.name === name);
  if (existing) return res.status(400).json({ error: "name must be unique" });

  const id = Math.floor(10000000 + Math.random() * 90000000);
  const person = {
    id: `${id}`,
    name,
    number,
  };

  persons.push(person);

  return res.status(200).send(person);
});

module.exports = app;
