import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported from react-router-dom
import { useCart } from "../context/CartContext"; // Correct the duplicate import

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { addToCart, removeFromCart, cartItems } = useCart(); // Access addToCart, removeFromCart, and cartItems from CartContext

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      setCategories(data);
    };

    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Check if a product is already in the cart and return its quantity
  const getProductQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div>
      <div className="py-5">
        {/* Horizontally scrollable category list */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="btn btn-outline btn-primary"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>{" "}
      {/* Closing the div that wraps the categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => {
          const quantity = getProductQuantity(product.id);
          return (
            <div key={product.id} className="card bg-base-100 shadow-xl">
              <figure className="bg-white h-48 p-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain h-full w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title truncate">{product.title}</h2>
                <p>${product.price}</p>
                <div className="card-actions justify-end items-center">
                  <a
                    className="no-underline hover:underline text-xs"
                    href={`/category/${product.category}`}
                  >
                    More from {product.category}
                  </a>
                  {quantity > 0 ? (
                    <div className="flex items-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => removeFromCart(product.id)}
                      >
                        -
                      </button>
                      <span className="mx-2">{quantity}</span>
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
