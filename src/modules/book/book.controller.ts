import { Request, Response, NextFunction } from 'express';
import { Book } from './book.model';

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, message: 'Book created successfully', data: book });
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
    const condition = filter ? { genre: filter } : {};
    const books = await Book.find(condition).sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 }).limit(Number(limit));
    res.json({ success: true, message: 'Books retrieved successfully', data: books });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, message: 'Book retrieved successfully', data: book });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, message: 'Book updated successfully', data: book });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Book deleted successfully', data: null });
  } catch (error) {
    next(error);
  }
};