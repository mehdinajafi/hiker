import mongoose from "mongoose";

const subscribedEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const SubscribedEmail =
  mongoose.models.SubscribedEmail ||
  mongoose.model("SubscribedEmail", subscribedEmailSchema);

export default SubscribedEmail;
