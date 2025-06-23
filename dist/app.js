"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = __importDefault(require("./modules/book/book.route"));
const borrow_route_1 = __importDefault(require("./modules/borrow/borrow.route"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/books', book_route_1.default);
app.use('/api/borrow', borrow_route_1.default);
// Root route
app.get('/', (req, res) => {
    res.send('Welcome from Library Management API');
});
// 404 Error Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Sorry! Route not found' });
});
exports.default = app;
