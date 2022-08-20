import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const { id } = useParams(); //    console.log(params)  // http://localhost:3000/pizza/5     //{id: '5'}
  const navigate = useNavigate();

  //могло быть так  const [pizza, setPizza] = React.useState<number>();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>(); //по умолчанию начальные значение-undefined

  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks/${id}`,
        );
        return setPizza(data);
      } catch (err) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    };
    fetchPizza();
  }, []);

  //пицца еще не загрузилась с бэка, но картинку мы уже просим, поэтому...
  //tsx - если пицца undefined- верни jsx
    //Теперь pizza- это обьект
    if (!pizza) {
    return <>Загрузка...</>;
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
