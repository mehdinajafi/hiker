import db from "@/lib/db";
import ShippingMethod from "@/models/ShippingMethod";

const getShippingMethods = async () => {
  try {
    await db.connect();
    const methods = await ShippingMethod.find({});
    await db.disconnect();

    return methods;
  } catch (error) {
    throw Error(`getShippingMethods: ${error}`);
  }
};

export default getShippingMethods;
