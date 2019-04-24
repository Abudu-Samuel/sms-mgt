import { model, Schema } from "mongoose";

const ContactSchema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  receiver: {
    type: String,
    required: true,
    trim: true
  },
  sender: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: "contact"
  }
});

export default model("Message", ContactSchema);
