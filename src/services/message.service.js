import Message from "../models/message.model.js";

const createMessage = async ({ chatId, senderType, message }) => {
const newMessage =
  await Message.create({
    chatId,
    senderType,
    message,

    seenByAdmin:
      senderType === "admin",

    seenByUser:
      senderType === "user",
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

const markMessagesAsReadByUser =
  async (chatId) => {
    return await Message.updateMany(
      {
        chatId,
        senderType: "admin",
        seenByUser: false,
      },
      {
        $set: {
          seenByUser: true,
        },
      }
    );
  };

  const getUserUnreadCount =
  async (chatId) => {
    return await Message.countDocuments({
      chatId,
      senderType: "admin",
      seenByUser: false,
    });
  };

export default {
  createMessage,
  getMessagesByChatId,
  markMessagesAsRead,
  getUnreadCountsByChat,
  markMessagesAsReadByUser,
  getUserUnreadCount,
};