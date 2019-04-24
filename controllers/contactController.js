import Contact from "../models/ContactModel";
import Message from "../models/MessageModel";
import { contactValidation } from "../helpers/validation";
import dataResponse from "../helpers/responseInfo";

class ContactController {
  static createContact = (req, res) => {
    const { errors, isValid } = contactValidation(req.body);
    const { firstName, lastName, phoneNumber } = req.body;

    if (!isValid) {
      return dataResponse.error(res, 400, errors);
    }
    return Contact.findOne({
      phoneNumber
    }).then(contactExists => {
      if (contactExists) {
        return dataResponse.error(res, 409, "Sorry, contact already exists");
      }
      const contact = new Contact({
        firstName,
        lastName,
        phoneNumber
      });
      contact
        .save()
        .then(contact =>
          dataResponse.success(res, 201, "Contact added", contact)
        )
        .catch(() =>
          dataResponse.error(res, 500, "Sorry, unable to save contact")
        );
    });
  };

  static removeContact = (req, res) => {
    return Contact.findOneAndDelete({
      _id: req.params.contactId
    })
      .then(contact => {
        return Message.deleteMany({
          sender: contact.phoneNumber
        }).then(() => {
          return Message.deleteMany({
            receiver: contact.phoneNumber
          }).then(() => {
            dataResponse.success(
              res,
              200,
              "Contact was removed successfully",
              []
            );
          });
        });
      })
      .catch(() => dataResponse.error(res, 500, "something went wrong"));
  };
}

export default ContactController;
