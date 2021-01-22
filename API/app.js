const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const db = require('../db');
const { Router } = require('express');
const jwt = require('jsonwebtoken');

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next();
});

app.get('/spending', (req, res, next) => {
  db.query('SELECT * FROM spending WHERE accountid = $1', [3], (err, resp) => {
    if (err) {
      return next(err)
    }
    res.send(resp.rows)
  })
})

app.delete('/spending/:position', (req, res) => {
  db.query('DELETE FROM spending WHERE position = $1', [req.params.position], (err, resp) => {
    if (err) {
      res.sendStatus(500).send(next(err))
    }
    res.status(200).send({ status: 'OK'});
  })
});

app.get("/account/:username", (req, res, next)=>{
  db.query("SELECT password FROM account WHERE username = $1", [req.params.username], (err, resp) => {
    if(err){
      res.sendStatus(500).send(next(err))
    }
    console.log(resp)
    res.send(resp.rows)
  })
});

/*
app.post("/account/", (req, res) => {
  const accountid = req.body.accountid;
  const username = req.body.username;
  const password = req.body.password;

  if(accountid == null || username == null || password == 0){
    res.sendStatus(500).send("Wrong body")
  }

  db.query("INSERT INTO account(accountid, username, password) VALUES ($1, $2, $3)", [accountid, username, password], (err, resp) => {
    if(err){
      res.sendStatus(500).send(err)
    }
    res.status(200).send({stratus: "OK" });
  })
});
*/

app.get("/account", (req, res)=>{
  db.query("SELECT * FROM account WHERE accountid = $1", [2], (err, resp) =>{
    if(err){
      return next(err)
    }
    res.send(resp.rows)
  })

})


app.post("/account", (req, res) => {
  db.query("SELECT * FROM account WHERE username = $1", [req.body.username], (err, resp) =>{
    if(err) {
      return next(err)
    }
    if(resp.rows[0].password == req.body.password){
      console.log("Login successful")
      //return res.send(true)
      let payload = {subject:resp.rows[0].accountid}
      let token = jwt.sign(payload, "qwe1234")
      res.status(200).send({token})
      
    }
    else{
      return res.send(false)
    }

  })
})

app.post("/account/register", (req, res) => {
  const accountid = req.body.accountid;
  const username = req.body.username;
  const password = req.body.password;

  if(accountid == null || username == null || password == null){
    res.sendStatus(500).send("Wrong body")
  }

  db.query("INSERT INTO account(accountid, username, password) values ($1, $2, $3)", [accountid ,username, password], (err, resp) => {
   if (err) {
      res.sendStatus(500).send(next(err))
    }
    let payload = {subject:accountid}
    let token = jwt.sign(payload, "qwe1234")
    res.status(200).send({token});
  })
})
