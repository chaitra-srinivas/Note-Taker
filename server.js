const express = require('express');
const path = require('path');
const api = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', api);

app.use(express.static('public'));


// GET route for notes page
app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})


// Wildcard route to the homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(PORT, () => {
  console.log(`Note taker app is listening at http://localhost:${PORT}`);
});


