import { Server } from "socket.io";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

let io;

const connectedUsers = new Map();

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://pearlines-frontend-admin-tdhr.onrender.com",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    // User joins
    socket.on("join-user", (mobileNo) => {
      connectedUsers.set(mobileNo, socket.id);
    });

    // Admin joins
    socket.on("join-admin", () => {
      connectedUsers.set("admin", socket.id);
    });

    // Send Message
    socket.on("send-message", async (data) => {
      try {
        const {
          chatId,
          senderType,
          message,
          mobileNo,
        } = data;

        const newMessage = await Message.create({
          chatId,
          senderType,
          message,
        });

        await Chat.findByIdAndUpdate(chatId, {
          lastMessage: message,
          lastMessageAt: new Date(),
        });

        // Admin → User
        if (senderType === "admin") {
          const userSocket =
            connectedUsers.get(mobileNo);

          if (userSocket) {
            io.to(userSocket).emit(
              "receive-message",
              newMessage
            );
          }
        }

        // User → Admin
        if (senderType === "user") {
          const adminSocket =
            connectedUsers.get("admin");

          if (adminSocket) {
            io.to(adminSocket).emit(
              "receive-message",
              newMessage
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    });

    // Broadcast Message
    socket.on(
      "broadcast-message",
      async (data) => {
        io.emit(
          "broadcast-message",
          data
        );
      }
    );

    socket.on("disconnect", () => {
      console.log(
        "Socket Disconnected:",
        socket.id
      );

      for (const [
        key,
        value,
      ] of connectedUsers.entries()) {
        if (value === socket.id) {
          connectedUsers.delete(key);
          break;
        }
      }
    });
  });

  return io;
};

export const getIO = () => io;