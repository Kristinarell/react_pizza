import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../redux/filterSlice';

function Categories() {
  //const [activeCategory, setActiveCategory] = useState(1);

  // вместо state мы создали состояние category в слайсе filter  - там заданили начальное значение 1
  // изменяем ее через dispatch(setActiveCategory(category.id))

  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.filter.category); // получаем текущую категорию из filterSlice

  const categories = [
    { id: 0, name: 'Все' },
    { id: 1, name: 'Мясные' },
    { id: 2, name: 'Вегетарианские' },
    { id: 3, name: 'Гриль' },
    { id: 4, name: 'Острые' },
    { id: 5, name: 'Закрытые' },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => dispatch(setActiveCategory(category.id))}
            className={activeCategory == category.id ? 'active' : ' '}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
