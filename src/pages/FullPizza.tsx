import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const { id } = useParams(); //    console.log(params)  // http://localhost:3000/pizza/5     //{id: '5'}
  const navigate = useNavigate(); //функция перехода

  //могло быть так  const [pizza, setPizza] = React.useState<number>(); | ТИПИЗАЦИЯ useState, где в pizza={}
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>(); //1.по умолчанию начальные значение-undefined

  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks/${id}`,
        );
        return setPizza(data);
      } catch (err) {
        alert('Error getting pizza!');
        navigate('/');
      }
    };
    fetchPizza();
  }, []);

  //пицца еще не загрузилась с бэка, но картинку уже просим, поэтому...
  //tsx - если pizza undefined- верни <>Загрузка...</>
  //.2 Теперь  pizza- это обьект (not undefined)
  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
