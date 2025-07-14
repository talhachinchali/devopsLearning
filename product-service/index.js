const express = require('express');
const app = express();
const port = 3002;

app.get('/products', (req, res) => {
  res.json([
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Phone' }
  ]);
});

app.listen(port, () => {
  console.log(`Product Service running on http://localhost:${port}`);
});
