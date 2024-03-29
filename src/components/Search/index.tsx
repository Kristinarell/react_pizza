import React, { useCallback, useRef, useState } from 'react';
import styles from './Search.module.css';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/filterSlice';
import debounce from 'lodash.debounce';

function Search() {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(``);

  const handleInputFetching = useCallback(
    debounce((inputValue: string) => {
      dispatch(setSearchQuery(inputValue));
      console.log('отправили запрос со сторокой', inputValue);
    }, 700),
    [],
  );

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
          handleInputFetching(event.target.value);
        }}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      <svg
        onClick={() => {
          dispatch(setSearchQuery(``));
          setInputValue(``);
          inputRef.current?.focus();
        }}
        className={styles.clearIcon}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
      </svg>
    </div>
  );
}

export default Search;
