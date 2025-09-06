import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute';
import productRouter from './routes/productRoutes';
import orderRouter from './routes/orderRoutes';
import newsRouter from './routes/newsRoutes';
import dashboardRouter from './routes/dashboardRoutes'
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: [process.env.FRONTEND_URL || ""],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());


app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use("/api/news", newsRouter);
app.use("/api/analytics", dashboardRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});