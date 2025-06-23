"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: genres, required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
}, { timestamps: true });
bookSchema.statics.updateAvailability = async function (bookId) {
    const book = await this.findById(bookId);
    if (book) {
        book.available = book.copies > 0;
        await book.save();
    }
};
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
