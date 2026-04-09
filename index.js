import express from 'express';
import mongoConnection from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // ✅ added
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js'; // ✅ added

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}));

mongoConnection();
app.use(cookieParser())
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/uploads',express.static('uploads'))

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log("My new server is running on " + PORT);
});