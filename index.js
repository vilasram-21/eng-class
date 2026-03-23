import express from 'express';
import mongoConnection from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // ✅ added

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoConnection();

// ✅ connect routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log("My new server is running on " + PORT);
});