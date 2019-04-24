import express from "express";
import messageController from "../controllers/messageController";

const router = express.Router();

router.get("/message-sent/:contactId", messageController.fetchMessageSent);
router.post("/create-message", messageController.createMessage);
router.get(
  "/message-received/:contactId",
  messageController.fetchMessageReceived
);

export default router;
