import messageService from "../services/message.service.js";

import chatService from "../services/chat.service.js";

const createMessage = async (req, res) => {
  try {
    const { chatId, senderType, message } = req.body;

    const newMessage = await messageService.createMessage({
      chatId,
      senderType,
      message,
    });

    await chatService.updateLastMessage(chatId, message);

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessagesByChatId = async (req, res) => {
  try {
    const messages = await messageService.getMessagesByChatId(
      req.params.chatId,
    );

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const markMessagesAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;

    await messageService.markMessagesAsRead(chatId);

    res.status(200).json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createMessage,
  getMessagesByChatId,
  markMessagesAsRead,
};