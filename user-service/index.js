const express = require('express');
const app = express();
const port = 3001;

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});
app.get("/usrsAgain",(req,res)=>{
  res.json([
    {id:1,name:"kiran"},
    {id:2,name:"talha"}
  ])
})

app.listen(port, () => {
  console.log(`User Service running on http://localhost:${port}`);
});
