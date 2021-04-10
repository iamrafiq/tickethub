import express from 'express'
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/users/currentuser', (req, res)=>{
    res.send('hello there!')
})
app.get('/api/users/currentusers', (req, res)=>{
    res.send('hi there!')
})
app.listen(3000, ()=>{
    console.log("auth port 3000")
})