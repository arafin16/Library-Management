import express, { Application, Request, Response } from "express";
import booksRoutes from "./modules/book/book.route";
import borrowRoutes from "./modules/borrow/borrow.route";


const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', booksRoutes);
app.use('/api/borrow', borrowRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome from Library Management API');
});

// 404 Error Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Sorry! Route not found' });
});

export default app;