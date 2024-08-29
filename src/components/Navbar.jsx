import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import the useCart hook

const Navbar = () => {
  const { cartItems } = useCart(); // Get cartItems from CartContext

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate the subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1  justify-around ">
        <Link to="/" className="btn btn-ghost text-xl">
          My eCommerce
        </Link>
      </div>
      <div className="flex-1  justify-around">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {/* This span shows the number of items in the cart */}
              <span className="badge badge-sm indicator-item">
                {totalItems}
              </span>
            </div>
          </div>
          {/* Dropdown content that appears when the cart icon is clicked */}
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              {/* Number of items in the cart */}
              <span className="text-lg font-bold">{totalItems} Items</span>
              {/* Subtotal of the items */}
              <span className="text-info">
                Subtotal: ${subtotal.toFixed(2)}
              </span>
              {/* Link to view the full cart */}
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
