import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart(); // Access cart operations from CartContext

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">
              Total: ${calculateTotal().toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
