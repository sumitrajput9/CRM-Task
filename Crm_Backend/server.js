const express = require('express');
const mongoose = require('mongoose');
const leadRoutes = require('./src/router/leadRouter');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/leads', leadRoutes);
mongoose.connect('mongodb://localhost:27017/keyValueDB', {
  useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
}).catch(err => {
  console.error('Connection error', err);
});

