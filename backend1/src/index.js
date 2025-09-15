import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import orderRouter from './routes/order.route.js';
import esewaRouter from './routes/esewa.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [process.env.FRONTEND_URL || ""],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/esewa', esewaRouter);

app.get('/', (req, res) => {
  res.send('Hello from Backend 1!');
});

app.listen(PORT, () => {
  console.log(`Backend 1 is running on http://localhost:${PORT}`);
});