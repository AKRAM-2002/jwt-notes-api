require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected successfully to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err)
);

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));