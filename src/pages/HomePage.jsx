import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { useSearchParams, useLocation } from 'react-router-dom';

import Categories from '../components/Categories';
import SortPizza from '../components/SortPizza';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Skeleton';

import { setTotalPages, setCurrentPage, selectFilter, setFiltersFromURL, setUrl } from '../redux/filterSlice';
import { selectItems, fetchItems } from '../redux/pizzaSlice';

export default function HomePage() {
  console.log('Component DID MOUNT');
  const [searchParams, setSeatchParams] = useSearchParams();

  const location = useLocation();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const status = useSelector((state) => state.pizza.status);
  const { category, sort, currentPage, searchQuery, totalPages, itemsPerPage, urlHasSearchParams } =
    useSelector(selectFilter);

  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log(`'First useEffect set URL params'  `);
    console.log('category', category);
    console.log('currentPage', currentPage);
    console.log('itemsPerPage', itemsPerPage);
    console.log('sort.sortProperty ', sort.sortProperty);
    setSeatchParams({ page: currentPage, limit: itemsPerPage, category, sort: sort.sortProperty });
  }, [category, sort, currentPage]);

  useEffect(() => {
    console.log('Second useEffect');
    console.log('LOCATION', location.search);
    if (location.search) {
      dispatch(
        setFiltersFromURL({
          category: searchParams.get(`category`),
        }),
      );
    }
    if (urlHasSearchParams) {
      console.log(`Second useEffect params - category=${category} `);
      const categoryUrl = category > 0 ? `&category=${category}` : ``; // mockapi не позволяет одновременно фильтровать по категориям и поиску
      console.log('category', categoryUrl);
      const search = category === 0 ? `&search=${searchQuery}` : ``; // поэтому поиск будет только для всех пицц когда category === 0
      const sortBy = `&sortBy=${sort.sortProperty}&order=${sort.order}`;

      dispatch(fetchItems({ categoryUrl, sortBy, currentPage, search, itemsPerPage }));
    }
  }, [location.search, urlHasSearchParams]);

  if (status === `failed`) {
    return (
      <div className="cart cart--empty">
        <h2> Произошла ошибка 😕</h2>
        <p>Не удалось загрузить питсы. Попробуйте обновить страницу</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <SortPizza />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) // фейковый массив со скелотонами
          : items.map((pizza) => <Pizza pizza={pizza} key={pizza.id} />)}
      </div>
      <Pagination
        count={3} // общее количество страниц
        page={currentPage}
        onChange={(event, value) => dispatch(setCurrentPage(value))}
        size="large"
      />
    </div>
  );
}

// console.log('First useEffect set URL params');

// console.log('First useEffect on first render');

//  dispatch(fetchItems) отправляет это действие в Redux store, RT запускает асинхронное действие fetchItems,
//  которое выполняет запрос данных. После успешного выполнения запроса,
//  RT создает дополнительное действие fetchItems.fulfilled,
//  которое обновляет состояние Redux в соответствии с данными запроса
//  код внутри .then() выполняется после успешного запроса и обновления состояния
//  доступ к данным результата асинхронной операции через поле payload

//.then(
//   (fulfilledResult) => {
//     const totalCountItems = fulfilledResult?.payload?.totalCountItems;
//     dispatch(setTotalPages(totalCountItems)); // количество страниц будет посчитано только после того как выполнится fetchItems
//   },
// );

// Когда асинхронное действие, созданное с помощью createAsyncThunk,
// завершается успешно, оно возвращает объект с полями payload и meta.
// payload содержит результат асинхронной операции

// console.log('LOCATION', location.search);
// if (location.search) {
//   console.log('LOCATION exsist');
// } else {
//   console.log('LOCATION doesnt exsist');
// }

// useEffect(() => {
//   if (location.search) {
//     dispatch(
//       setFiltersFromURL({
//         category: searchParams.get(`category`),
//       }),
//     );
//   }
// }, [location.search]);

// useEffect(() => {
//   const categoryUrl = category > 0 ? `category=${category}` : ``; // mockapi не позволяет одновременно фильтровать по категориям и поиску
//   const search = category === 0 ? `search=${searchQuery}` : ``; // поэтому поиск будет только для всех пицц когда category === 0
//   const sortBy = `sortBy=${sort.sortProperty}&order=${sort.order}`;

//   dispatch(fetchItems({ categoryUrl, sortBy, currentPage, search, itemsPerPage }));
//   setSeatchParams({ category: category }); // limit: itemsPerPage, sortBy  page: currentPage,
// }, [category, sort, currentPage]);
