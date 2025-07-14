const express = require('express');
const app = express();
const port = 3001;

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

app.listen(port, () => {
  console.log(`User Service running on http://localhost:${port}`);
});
