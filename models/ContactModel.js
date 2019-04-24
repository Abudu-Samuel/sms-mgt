import { model, Schema } from "mongoose";

const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    max: 100
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    max: 100
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  message: {
    type: [Schema.Types.ObjectId],
    ref: "message"
  }
});

export default model("Contact", ContactSchema);
