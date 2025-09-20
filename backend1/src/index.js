import express from 'express';
import http from "http";
import { Server } from "socket.io";
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import orderRouter from './routes/order.route.js';
import esewaRouter from './routes/esewa.route.js';
import khaltiRouter from './routes/khalti.route.js';
import messageRouter from './routes/message.route.js';
import newsRouter from './routes/news.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/esewa', esewaRouter);
app.use('/api/khalti', khaltiRouter);
app.use("/api/messages", messageRouter);
app.use('/api/news', newsRouter);


// Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL, methods: ["GET", "POST"] },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", {
        message: data.message,
        from: data.from,
      });
    }
  });
});

server.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port " + PORT)
);