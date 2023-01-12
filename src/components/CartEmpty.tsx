import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';
import React from "react";

const CartEmpty:React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        The cart is empty <span>😕</span>
      </h2>
      <p>
          You may not have ordered pizza yet.
        <br />
          To order a pizza, go to the main page
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
