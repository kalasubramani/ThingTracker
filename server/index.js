const express = require('express');
const app = express();
const path = require('path');
// const pg = require('pg');


//import db seeding
const {seed,client} = require('./db');

//serves static files from appdir/dist
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

//get source file for app. starting point
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../public/index.html'))); 
//say where api routes are configured
app.use('/api',require('./api'));

const init = async()=> {

  await client.connect();
  console.log("Connected to db");

  //seed the tables
  if(process.env.SYNC){ 
  await seed();
  }
  
  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
  });
};

init();
