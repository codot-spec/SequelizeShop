const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const expenseRoutes = require('./routes/item');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(expenseRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});