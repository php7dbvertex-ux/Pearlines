import Message from "../models/message.model.js";

const createMessage = async ({ chatId, senderType, message }) => {
  const newMessage = await Message.create({
    chatId,
    senderType,
    message,
    // Admin messages are inherently "seen" by the admin who sent them.
    // Only messages from the user start as unseen.
    seenByAdmin: senderType === "admin",
  });

  return newMessage;
};

const getMessagesByChatId = async (chatId) => {
  const messages = await Message.find({ chatId }).sort({
    createdAt: 1,
  });

  return messages;
};

// Marks all of the user's messages in a chat as seen by the admin.
const markMessagesAsRead = async (chatId) => {
  const result = await Message.updateMany(
    {
      chatId,
      senderType: "user",
      seenByAdmin: false,
    },
    {
      $set: { seenByAdmin: true },
    }
  );

  return result;
};

// Returns a map of { chatId: unreadCount } for all chats that have
// at least one unseen user message. Used by chat.service.getAllChats
// to attach unreadCount per chat without an N+1 query.
const getUnreadCountsByChat = async () => {
  const counts = await Message.aggregate([
    {
      $match: {
        senderType: "user",
        seenByAdmin: false,
      },
    },
    {
      $group: {
        _id: "$chatId",
        unreadCount: { $sum: 1 },
      },
    },
  ]);

  const countMap = {};
  counts.forEach((c) => {
    countMap[c._id.toString()] = c.unreadCount;
  });

  return countMap;
};

export default {
  createMessage,
  getMessagesByChatId,
  markMessagesAsRead,
  getUnreadCountsByChat,
};