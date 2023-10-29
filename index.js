const express = require('express');
const cors = require('cors');

const server = express();

const PORT = process.env.PORT || 9000

server.use(express.json());
server.use(cors());

const users = [];

server.get('/api/users', (req, res) => {
    res.json(users);
});

server.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({
            message: "Username and password are required"
        });
    }

    const newUser = { username, password };
    users.push(newUser);
    
    res.status(201).json(newUser);
})

server.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Both username and password are required.' });
    }
  
    const user = users.find((u) => u.username === username && u.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
  
    res.json({ message: `Welcome, ${user.username}!` });
  });

server.use('*', (req, res) => {
    res.json('<h1>Hello, World!</h1>')
});


server.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
});

server.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})