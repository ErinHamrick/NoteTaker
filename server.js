const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));



app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);



app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})