const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../public/index.html'))); 

const init = async()=> {

  console.log('do seed and sync here for database');

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
  });
};

init();
