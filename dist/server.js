"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const port = 5000;
const bootstrap = async () => {
    try {
        await mongoose_1.default.connect('mongodb+srv://arafinalamraj11:m0ubjteq9OGuxcWZ@cluster0.qukbsv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(' Connected to MongoDB');
        app_1.default.listen(port, () => {
            console.log(` Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error(' Failed to connect to MongoDB', error);
    }
};
bootstrap();
