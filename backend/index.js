import express from 'express';
import { PORT, MONGODB_URI } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
// import { Book } from './models/BookModels.js';
import bookRoute from './routes/BookRoute.js';
const app = express();

//Middleware for Requesting a body
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//Middleware for handeling Cors policy
app.use(cors());

//Home Route
app.get('/', (req, res) => {
  return res.send('<h1>BookStore Application</h1>');
});
// ALL URL ROUTES
app.use('/books', bookRoute);

//SET MONGODB FROM CONFIG FILE
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`PORT is running on ${PORT}`);
    });

    console.log('MONGODB is connected');
  })
  .catch((error) => {
    console.log('MONGODB Error!', { message: error });
  });
