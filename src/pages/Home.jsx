import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import React, {useContext, useEffect, useState} from 'react';
import Pagination from "../components/Pagination"
import {SearchContext} from "../App";

const Home = () => {
  const {searchValue}= useContext(SearchContext)

  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  //урок 9 31 минута
  useEffect(() => {
    setLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : ''; // const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    fetch(
      `https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr); // items=arr
        setLoading(false);
      });
    window.scrollTo(0, 0); //в Home.jsx при первом рендере чтобы перекидывало вверх
  }, [categoryId, sortType, searchValue, currentPage]);


  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={i => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={i => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </div>
  );
};

export default Home;

/*
const pizzas = items
    .filter(obj => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    })
    .map(obj => <PizzaBlock key={obj.id} {...obj} />);*/
