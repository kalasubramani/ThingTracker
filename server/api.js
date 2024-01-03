const express = require('express');
const { client } = require('./db');
const app = express.Router();
app.use(express.json());

//fetches all owners
app.get('/owners',async(req,res,next)=>{
  try{
    const SQL= ` SELECT * FROM owners;`
    const dbresponse = await client.query(SQL);
    res.send(dbresponse.rows);
  }catch(error){
    next(error);
  }
})

//fetches all antiques available
app.get('/antiques',async(req,res,next)=>{
  try{
    const SQL= ` SELECT * FROM antiques;`
    const dbresponse = await client.query(SQL);
    res.send(dbresponse.rows);
  }catch(error){
    next(error);
  }
})

app.put('/antiques/:id',async (req,res,next)=>{
  try{
     const SQL=`UPDATE antiques 
                SET owner_id = $1,
                    name = $2
                WHERE id=$3 
                RETURNING *`
   const dbresponse = await client.query(SQL, [req.body.owner_id, req.body.name,req.params.id]);
   res.send(dbresponse.rows[0]);
  }catch(error){
    next(error)
  }
})

module.exports = app;