import { Request, Response, NextFunction } from 'express';
import { Borrow } from './borrow.model';

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrow = await Borrow.create(req.body);
    res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
  } catch (error) {
    next(error);
  }
};

export const getBorrowSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
      { $lookup: { from: 'books', localField: '_id', foreignField: '_id', as: 'bookDetails' } },
      { $unwind: '$bookDetails' },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: { title: '$bookDetails.title', isbn: '$bookDetails.isbn' },
        },
      },
    ]);
    res.json({ success: true, message: 'Borrowed books summary retrieved successfully', data: summary });
  } catch (error) {
    next(error);
  }
};