import http from "http";
import { Server as SocketServer } from "socket.io";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import app from "./app.js";
import db from "./models/index.js";
import "./queues/initQueue.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected");
    await db.sequelize.sync({ alter: true });

    const server = http.createServer(app);
    const io = new SocketServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
      },
    });

    // Middleware: authenticate socket connection using httpOnly cookie
    io.use(async (socket, next) => {
      try {
        const cookieHeader = socket.handshake.headers.cookie;
        if (!cookieHeader) return next(new Error("Authentication error"));
        // parse cookies manually or use cookie-parser
        const token = cookieHeader
          .split(";")
          .find((c) => c.trim().startsWith("token="))
          ?.split("=")[1];
        if (!token) return next(new Error("Authentication error"));
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          id: number;
        };
        const user = await db.User.findByPk(decoded.id, {
          attributes: { exclude: ["password"] },
        });
        if (!user) return next(new Error("User not found"));
        socket.data.user = user;
        next();
      } catch (err) {
        next(new Error("Authentication error"));
      }
    });

    io.on("connection", (socket) => {
      console.log(`User ${socket.data.user?.email} connected`);

      // Example: join a room based on user ID
      socket.join(`user:${socket.data.user.id}`);

      // Listen for custom events
      socket.on("message", (data) => {
        console.log("Message received:", data);
        // Broadcast to all clients in user's room (or specific room)
        io.to(`user:${socket.data.user.id}`).emit("message", {
          text: data.text,
          from: socket.data.user.name,
        });
      });

      socket.on("disconnect", () => {
        console.log(`User ${socket.data.user?.email} disconnected`);
      });
    });

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

startServer();
