import React from 'react';
import { Link } from 'react-router-dom';
import emptyCart from '../assets/empty-cart.png';

const EmptyCart = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди на главную
        страницу.
      </p>
      <img src={emptyCart} alt="Empty Cart" />
      <div className="cart__bottom-buttons">
        <Link to="/" className="button go-back-btn button--black ">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"></path>
          </svg>
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
