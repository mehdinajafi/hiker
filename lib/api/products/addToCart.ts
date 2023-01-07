import db from "@/lib/db";
import Cart from "@/models/Cart";

interface IOptions {
  cartId: string;
  productId: string;
}

const addToCart = async ({ cartId, productId }: IOptions) => {
  try {
    await db.connect();

    const cart = await Cart.findById(cartId);

    // If the cart is not found, create new cart and add product to it
    if (!cart) {
      const newCart = new Cart({
        items: [{ productId, quantity: 1 }],
      });

      const cart = await newCart.save();

      await db.disconnect();

      return {
        cartId: cart._id,
      };
    }

    // Check if product is exist in cart items, if exist increament its quantity
    let productExist = await Cart.findOneAndUpdate(
      { _id: cart._id, "items.productId": productId },
      {
        $inc: {
          "items.$.quantity": 1,
        },
      }
    );

    // Add product to cart
    if (!productExist) {
      await Cart.findOneAndUpdate(
        { _id: cart._id },
        {
          $addToSet: {
            items: {
              productId: productId,
              quantity: 1,
            },
          },
        }
      );
    }

    await db.disconnect();

    return {
      cartId: cart._id,
    };
  } catch (error) {
    throw Error(`Error in addToCart in mongodb: ${error}`);
  }
};

export default addToCart;
