import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = () => {
  if (socket?.connected) return socket;

  socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
    withCredentials: true, // sends httpOnly cookie automatically
    transports: ["websocket"],
    autoConnect: true,
  });

  socket.on("connect", () => {
    // eslint-disable-next-line no-console
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    // eslint-disable-next-line no-console
    console.log("Socket disconnected");
  });

  socket.on("connect_error", (err) => {
    // eslint-disable-next-line no-console
    console.error("Socket connection error:", err.message);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
