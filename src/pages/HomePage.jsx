import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { useSearchParams, useLocation } from 'react-router-dom';

import Categories from '../components/Categories';
import SortPizza from '../components/SortPizza';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Skeleton';
import { sorts as sortsList } from '../components/SortPizza';
import { setTotalPages, setCurrentPage, selectFilter, setFiltersFromURL, setUrl } from '../redux/filterSlice';
import { selectItems, fetchItems } from '../redux/pizzaSlice';

export default function HomePage() {
  const [searchParams, setSeatchParams] = useSearchParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const items = useSelector(selectItems);
  const status = useSelector((state) => state.pizza.status);
  const { category, sort, currentPage, searchQuery, totalPages, itemsPerPage } = useSelector(selectFilter);

  const wasFirstRender = useRef(false);
  const isSearchParams = useRef(false);

  useEffect(() => {
    if (wasFirstRender.current) setSeatchParams({ page: currentPage, category, sort: sort.sortProperty });
    wasFirstRender.current = true;
  }, [category, currentPage, sort]);

  useEffect(() => {
    if (location.search) {
      const currentSort = sortsList.find((obj) => obj.sortProperty === searchParams.get(`sort`));
      dispatch(
        setFiltersFromURL({
          category: searchParams.get(`category`),
          currentPage: searchParams.get(`page`),
          sort: currentSort,
        }),
      );
      isSearchParams.current = true;
    }
  }, []);

  useEffect(() => {
    const categoryUrl = category > 0 ? `&category=${category}` : ``;
    const search = category === 0 ? `&search=${searchQuery}` : ``;
    const sortBy = `&sortBy=${sort.sortProperty}&order=${sort.order}`;

    if (!isSearchParams.current)
      dispatch(fetchItems({ categoryUrl, sortBy, currentPage, search, itemsPerPage })).then(
        (fulfilledResult) => {
          const totalCountItems = fulfilledResult?.payload?.totalCountItems;
          dispatch(setTotalPages(totalCountItems)); // количество страниц будет посчитано только после того как выполнится fetchItems
        },
      );

    isSearchParams.current = false;
  }, [category, currentPage, sort, searchQuery]);

  if (status === `failed`) {
    return (
      <div className="cart cart--empty">
        <h2> Произошла ошибка 😕</h2>
        <p>Не удалось загрузить питсы. Попробуйте обновить страницу</p>
      </div>
    );
  }

  if (items.length === 0 && status !== 'loading') {
    return (
      <div className="cart cart--empty">
        <h2> Пиццы не найдены 😕</h2>
        <p>Попробуйте вернутся на главную страницу и сбросить поисковые параметры</p>
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
        count={totalPages} // общее количество страниц
        page={currentPage}
        onChange={(event, value) => dispatch(setCurrentPage(value))}
        size="large"
      />
    </div>
  );
}

//  dispatch(fetchItems) отправляет это действие в Redux store, RT запускает асинхронное действие fetchItems,
//  которое выполняет запрос данных. После успешного выполнения запроса,
//  RT создает дополнительное действие fetchItems.fulfilled,
//  которое обновляет состояние Redux в соответствии с данными запроса
//  код внутри .then() выполняется после успешного запроса и обновления состояния
//  доступ к данным результата асинхронной операции через поле payload

// Когда асинхронное действие, созданное с помощью createAsyncThunk,
// завершается успешно, оно возвращает объект с полями payload и meta.
// payload содержит результат асинхронной операции
