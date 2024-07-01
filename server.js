// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const path = require('path');

// // Define routes
// let index = require('./routes/index');
// let image = require('./routes/image');

// // connecting the database
// let mongodb_url = 'mongodb://localhost:27017/';
// let dbName = 'darkroom';
// mongoose.connect(`${mongodb_url}${dbName}`,{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
//     if (err) console.log(err)
// });

// // test if the database has connected successfully
// let db = mongoose.connection;
// db.once('open', ()=>{
//     console.log('Database connected successfully')
// })

// // Initializing the app
// const app = express();


// // View Engine
// app.set('view engine', 'ejs');

// // Set up the public folder;
// app.use(express.static(path.join(__dirname, 'public')));

// // body parser middleware
// app.use(express.json())


// app.use('/', index);
// app.use('/image', image);




 
// const PORT = process.env.PORT || 5000;
// app.listen(PORT,() =>{
//     console.log(`Server is listening at http://localhost:${PORT}`)
// });

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// MongoDB connection string from environment variable
//const mongodb_url = process.env.MONGO_URI || 'mongodb://localhost:27017/darkroom';
//const mongodb_url = process.env.MONGO_URI || 'mongodb://mongodb_ip_address:27017/darkroom';,
const mongodb_url = 'mongodb+srv://holliemwangi:H0llies@m@tmcluster.zbhbjtc.mongodb.net/darkroom?retryWrites=true&w=majority';


// Connect to the database
mongoose.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(err);
});

// Test if the database has connected successfully
let db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected successfully');
});

// Initialize the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

// Use routes
app.use('/', index);
app.use('/image', image);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
