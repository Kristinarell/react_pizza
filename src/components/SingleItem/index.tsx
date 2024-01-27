import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TPizza } from '../../redux/pizzaSlice';
import styles from './SingleItem.module.css';

const SingleItem: React.FC = () => {
  const [item, setItem] = useState<TPizza>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchSingleItem() {
      const response = await axios.get(`https://6537a5a9bb226bb85dd38bce.mockapi.io/items/${id}`);
      setItem(response.data);
    }
    fetchSingleItem();
  }, []);
  return (
    <div className={styles.modal} onClick={() => navigate('/')}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.leftSide}>
          <img src={item?.imageUrl} alt="Pizza" />
          <h2>{item?.title}</h2>
        </div>
        <div className="rightSide"></div>
      </div>
    </div>
  );
};

export default SingleItem;
