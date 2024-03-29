import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { TPizza } from '../redux/pizzaSlice';
import { Link, useLocation } from 'react-router-dom';

const Pizza: React.FC<{ pizza: TPizza }> = ({ pizza }) => {
  const pizzaTypes = ['тонкое', 'традиционное'];
  const [activeSize, setActiveSize] = useState(pizza.sizes[0]);
  const [activeType, setActiveType] = useState(pizza.types[0]);

  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <div className="pizza-block">
      <Link to={`/pizza/${pizza.id}`} state={{ previousLocation: location }}>
        <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{pizza.title}</h4>
      </Link>

      <div className="pizza-block__selector">
        <ul>
          {pizza.types.map((typeId) => (
            <li
              key={typeId}
              className={typeId === activeType ? 'active' : ' '}
              onClick={() => setActiveType(typeId)}>
              {pizzaTypes[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {pizza.sizes.map((size) => (
            <li
              key={size}
              className={size === activeSize ? 'active' : ' '}
              onClick={() => setActiveSize(size)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizza.price}₽</div>
        <button
          className="button button--outline button--add"
          onClick={() => {
            dispatch(
              addToCart({
                ...pizza,
                selectedSize: activeSize,
                selectedType: pizzaTypes[activeType],
                quantity: 1,
              }),
            );
          }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>0</i>
        </button>
      </div>
    </div>
  );
};

export default Pizza;
