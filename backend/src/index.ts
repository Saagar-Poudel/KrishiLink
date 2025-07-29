import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: [process.env.FRONTEND_URL || ""],
    methods: ["POST"],
    credentials: true,
}));

app.use(express.json());

//create user routes
app.use('/api/users', userRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});