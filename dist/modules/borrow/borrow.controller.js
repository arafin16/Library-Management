"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("./borrow.model");
const borrowBook = async (req, res, next) => {
    try {
        const borrow = await borrow_model_1.Borrow.create(req.body);
        res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
    }
    catch (error) {
        next(error);
    }
};
exports.borrowBook = borrowBook;
const getBorrowSummary = async (req, res, next) => {
    try {
        const summary = await borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        next(error);
    }
};
exports.getBorrowSummary = getBorrowSummary;
