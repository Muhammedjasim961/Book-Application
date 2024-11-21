//Route for Get All Books
import express from 'express';
import { Book } from '../models/BookModels.js';
const router = express.Router();

//LIST ALL BOOKS
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});
//Route for Gets One Book By ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.status(201).json(books);
  } catch (error) {
    console.log(error);
    console.log('Coud"nt Find the Book');
    return res.status(400).json({ message: error.message });
  }
});

//Route For update A Book By ID
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .json({ message: 'There IS No Tile, Author And PublishYear' });
    }
    const { id } = req.params;
    const updateBooks = await Book.findByIdAndUpdate(id, req.body);
    if (!updateBooks) {
      return res.status(400).json({ message: 'Books Not Found' });
    }
    return res.status(200).json({ message: 'Book Updated Successfully' });
  } catch (error) {
    return req.status(404).json({ message: error.message });
  }
});

//Route For Delete a Bok By id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      return res.status(401).json({ message: 'Book Not Found' });
    }
    return res.status(200).json({ message: 'Book Deleted Successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//SET ROUTE FOR SAVING THE BOOK
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: 'send All required Fields: title,author ,publishYear',
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).json(book);
  } catch (error) {
    console.log('Error in Saving Books');
    return res.status(404).json({ message: error.message });
  }
});

export default router;
