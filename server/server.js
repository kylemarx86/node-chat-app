const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

// create brand new express application
// configure express static middleware like previously to serve up public folder
// call app .listen on 3000
//      console.log message 
// start up and go to local host 3000 to check
var app = express();
const port = process.env.PORT || 3000;

// express static middleware
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});