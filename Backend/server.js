const express = require('express');
const cors = require('cors');
const compoundRoutes = require('./Routes/compoundsRouter');
const authRoutes=require('./Routes/authRouter');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/compounds', compoundRoutes);
app.use('/auth',authRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});