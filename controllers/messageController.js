import Contact from "../models/ContactModel";
import Message from "../models/MessageModel";
import { messageValidation } from "../helpers/validation";
import dataResponse from "../helpers/responseInfo";

class MessageController {
  static createMessage = (req, res) => {
    const { errors, isValid } = messageValidation(req.body);
    const { sender, receiver, message } = req.body;

    if (!isValid) {
      return dataResponse.error(res, 400, errors);
    }

    return Contact.findOne({
      phoneNumber: sender
    }).then(senderContact => {
      if (!senderContact) {
        return dataResponse.error(
          res,
          404,
          "Sender contact number does not exist"
        );
      }

      return Contact.findOne({
        phoneNumber: receiver
      }).then(receiverContact => {
        if (!receiverContact) {
          return dataResponse.error(
            res,
            404,
            "Receiver contact number does not exist"
          );
        }

        return Message.create({
          message,
          sender,
          receiver
        })
          .then(message => {
            return dataResponse.success(res, 201, "Message was sent", {
              text: message,
              status: "Delivered",
              sentFrom: sender,
              sentTo: receiver
            });
          })
          .catch(() => dataResponse.error(res, 500, "Message delivery failed"));
      });
    });
  };

  static fetchMessageSent = (req, res) => {
    return Contact.findById({
      _id: req.params.contactId
    }).then(contact => {
      if (!contact) {
        return dataResponse.error(
          res,
          404,
          "contact with this id does not exists"
        );
      }

      return Message.find({
        sender: contact.phoneNumber
      })
        .then(messageSent => {
          return dataResponse.success(
            res,
            200,
            "Message(s) sent fetched successfully",
            messageSent
          );
        })
        .catch(() =>
          dataResponse.error(res, 500, "Oops, something went wrong")
        );
    });
  };

  static fetchMessageReceived = (req, res) => {
    return Contact.findById({
      _id: req.params.contactId
    }).then(contact => {
      if (!contact) {
        return dataResponse.error(
          res,
          404,
          "contact with this id does not exists"
        );
      }

      return Message.find({
        receiver: contact.phoneNumber
      })
        .then(messageReceived => {
          return dataResponse.success(
            res,
            200,
            "Message(s) received fetched successfully",
            messageReceived
          );
        })
        .catch(() =>
          dataResponse.error(res, 500, "Oops, something went wrong")
        );
    });
  };
}

export default MessageController;
