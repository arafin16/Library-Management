"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("./book.model");
const createBook = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.create(req.body);
        res.status(201).json({ success: true, message: 'Book created successfully', data: book });
    }
    catch (error) {
        next(error);
    }
};
exports.createBook = createBook;
const getAllBooks = async (req, res, next) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
        const condition = filter ? { genre: filter } : {};
        const books = await book_model_1.Book.find(condition).sort({ [sortBy]: sort === 'asc' ? 1 : -1 }).limit(Number(limit));
        res.json({ success: true, message: 'Books retrieved successfully', data: books });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBooks = getAllBooks;
const getBookById = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.findById(req.params.id);
        if (!book)
            return res.status(404).json({ success: false, message: 'Book not found' });
        res.json({ success: true, message: 'Book retrieved successfully', data: book });
    }
    catch (error) {
        next(error);
    }
};
exports.getBookById = getBookById;
const updateBook = async (req, res, next) => {
    try {
        const book = await book_model_1.Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book)
            return res.status(404).json({ success: false, message: 'Book not found' });
        res.json({ success: true, message: 'Book updated successfully', data: book });
    }
    catch (error) {
        next(error);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res, next) => {
    try {
        await book_model_1.Book.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Book deleted successfully', data: null });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBook = deleteBook;
