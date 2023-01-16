import SubscribedEmail from "@/models/SubscribedEmail";
import db from "../db";

interface IOptions {
  email: string;
}

const subscribeToNewsletter = async ({ email }: IOptions) => {
  try {
    await db.connect();
    const newEmail = new SubscribedEmail({
      email,
    });
    await newEmail.save();
    await db.disconnect();
  } catch (error) {
    throw Error(`subscribeToNewsletter: ${error}`);
  }
};

export default subscribeToNewsletter;
