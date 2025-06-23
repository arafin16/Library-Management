"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("../book/book.model");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
}, { timestamps: true });
borrowSchema.post('save', async function () {
    const book = await book_model_1.Book.findById(this.book);
    if (book) {
        book.copies -= this.quantity;
        await book.save();
        await book_model_1.Book.updateAvailability(book._id);
    }
});
exports.Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
