import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { ICart } from "@/interfaces";
import CartItemRow from "../CartItemRow";
import CartRow from "../CartRow";
import RotateIcon from "@/public/icons/rotate.svg";

interface ICartTable {
  data: { cart: ICart } | undefined;
  isLoading: boolean;
  error: any;
}

const CartTable: React.FC<ICartTable> = (props) => {
  const { data, isLoading, error } = props;

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        <div className="flex flex-col">
          <div>Something went wrong!</div>
          <div className="mt-2">
            <Button
              color="gray"
              onClick={() => location.reload()}
              startIcon={<RotateIcon width={20} height={20} />}
            >
              Reload Page
            </Button>
          </div>
        </div>
      </Alert>
    );
  }

  if (!data || !data.cart || data.cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <img
          src="/images/empty-cart.png"
          width={100}
          height={100}
          className="mb-4"
        />
        <div className="text-center text-xl font-bold">Cart is empty!</div>
      </div>
    );
  }

  return (
    <div>
      <CartRow head>
        <div>Product</div>
        <div className="text-center">Price</div>
        <div>Quantity</div>
        <div className="text-center">Total Price</div>
        <div></div>
      </CartRow>

      {data.cart.items.map((cartItem, index) => (
        <CartItemRow
          key={cartItem.productId.toString()}
          number={index + 1}
          cartItem={cartItem}
        />
      ))}
    </div>
  );
};

export default CartTable;
