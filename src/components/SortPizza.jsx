import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveSort } from '../redux/filterSlice';

const sorts = [
  { id: 1, name: 'популярности', sortProperty: 'rating', order: 'asc' },
  { id: 2, name: 'цене', sortProperty: 'price', order: 'asc' },
  { id: 3, name: 'алфавиту', sortProperty: 'title', order: 'asc' },
];

export default function SortPizza() {
  const [isPopUp, setIsPopUp] = useState(false);

  //const [currentFilter, setCurrentFilter] = useState(filters[0].name);

  const dispatch = useDispatch();
  const activeSort = useSelector((state) => state.filter.sort);

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsPopUp(!isPopUp)}>{activeSort.name}</span>
      </div>
      {isPopUp && (
        <div className="sort__popup">
          <ul>
            {sorts.map((sort) => (
              <li
                key={sort.id}
                onClick={() => {
                  dispatch(setActiveSort(sort));
                }}>
                {sort.name}

                <svg
                  onClick={(event) => {
                    dispatch(
                      setActiveSort({
                        ...sort,
                        order: activeSort.order === 'asc' ? 'desc' : 'asc',
                      }),
                    );

                    event.stopPropagation();
                  }}
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`arrows ${
                    activeSort.id === sort.id && activeSort.order === 'desc' ? 'reversed' : ''
                  }`}>
                  <path
                    d="M12 5V19M12 5L6 11M12 5L18 11"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
