import mongoose from 'mongoose';
import app from './app';

const port = 5000;

const bootstrap = async () => {
  try {
    await mongoose.connect('mongodb+srv://arafinalamraj11:m0ubjteq9OGuxcWZ@cluster0.qukbsv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log(' Connected to MongoDB');

    app.listen(port, () => {
      console.log(` Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(' Failed to connect to MongoDB', error);
  }
};

bootstrap();
