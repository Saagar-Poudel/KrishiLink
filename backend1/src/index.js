import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import esewaRouter from "./routes/esewa.route.js";
import khaltiRouter from "./routes/khalti.route.js";
import messageRouter from "./routes/message.route.js";
import notificationRouter from "./routes/notification.route.js";
import { sendNotification } from "./utils/notification.service.js";
import newsRouter from './routes/news.route.js';
import profileRouter from './routes/profile.route.js'
import wishlistRouter from './routes/wishlist.route.js'
import reviewRouter from "./routes/review.route.js"
import savedFarmersRouter from './routes/savedFarmers.route.js'
import adminRouter from './routes/admin.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/esewa", esewaRouter);
app.use("/api/khalti", khaltiRouter);
app.use("/api/messages", messageRouter);
app.use("/api/notifications", notificationRouter);
app.use('/api/news', newsRouter);
app.use("/api/profile", profileRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/reviews', reviewRouter);
app.use("/api/saved-farmers", savedFarmersRouter);
app.use("/api/admin", adminRouter);


// Server
const server = http.createServer(app);
export const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL, methods: ["GET", "POST", "PATCH", "PUT", "DELETE"] },
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

  socket.on("send-notification", async (data) => {
    const { userId, type, title, message } = data;
    // Save + emit
    await sendNotification({ userId, type, title, message });
  });
});

server.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port " + PORT)
);
