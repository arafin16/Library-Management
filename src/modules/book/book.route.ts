import express, { Request, Response, NextFunction } from 'express';
import * as BookController from './book.controller';
const router = express.Router();
router.post('/', BookController.createBook);
router.get('/', BookController.getAllBooks);
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  BookController.getBookById(req, res, next).catch(next);
});
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  BookController.updateBook(req, res, next).catch(next);
});
router.delete('/:id', BookController.deleteBook);
export default router;