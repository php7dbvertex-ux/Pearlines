import Chat from "../models/chat.model.js";

import messageService from "./message.service.js";

const createChat = async (patientName, mobileNo) => {
  let chat = await Chat.findOne({ mobileNo });

  if (!chat) {
    chat = await Chat.create({ patientName, mobileNo });
  }

  return chat;
};

const getAllChats = async () => {
  const chats = await Chat.find().sort({ lastMessageAt: -1 });

  const unreadCountMap = await messageService.getUnreadCountsByChat();

  // Attach unreadCount to each chat (plain object, since chats are
  // mongoose documents and we don't want to mutate/save them).
  const chatsWithUnread = chats.map((chat) => {
    const chatObj = chat.toObject();

    chatObj.unreadCount = unreadCountMap[chat._id.toString()] || 0;

    return chatObj;
  });

  return chatsWithUnread;
};

const updateLastMessage = async (chatId, message) => {
  await Chat.findByIdAndUpdate(chatId, {
    lastMessage: message,
    lastMessageAt: new Date(),
  });
};

export default {
  createChat,
  getAllChats,
  updateLastMessage,
};