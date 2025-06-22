import { Schema, model } from 'mongoose';
import { Book } from '../book/book.model';

const borrowSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

borrowSchema.post('save', async function () {
  const book = await Book.findById(this.book);
  if (book) {
    book.copies -= this.quantity;
    await book.save();
    await Book.updateAvailability(book._id);
  }
});

export const Borrow = model('Borrow', borrowSchema);