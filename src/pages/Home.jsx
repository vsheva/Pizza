import axios from "axios";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import React, { useContext, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(state => state.filter); //state={filter: {categoryId: 0, sort: {…}}
  //const { sortType } = useSelector((state) => state.filter.sort.sortProperty)

  const sortType = sort.sortProperty;//const sortType = useSelector((state)=>state.filter.sort.sortProperty) //state={filter: {categoryId: 0, sort: {…}}


  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
 // const [currentPage, setCurrentPage] = useState(1);

  // const [categoryId, setCategoryId] = useState(0);
  //  const [sortType, setSortType] = useState({ name: 'популярности',sortProperty: 'rating',});

 /**  RTK это ДЕЛАЕТ АВТОМАТИЧЕСКИ за нас !!!
   const setCategory=(id)=>{
    return {type:'filters/categoryId', payload:id};
  }
  */

  const onChangeCategory = (id) => {
    //console.log(setCategoryId(id));      //вызов метода (из редакса) возвращает action {type: 'filters/setCategoryId', payload: 1}
    dispatch(setCategoryId(id));
  };

  const onChangePage =(number) => {
     dispatch(setCurrentPage(number))
  }


  useEffect(() => {
    setLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : ''; // const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';


   axios.get(`https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)
       .then(res =>{
           setItems(res.data);
           setLoading(false);
       })
    window.scrollTo(0, 0); //в Home.jsx при первом рендере чтобы перекидывало вверх
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

//<Sort {/*value={sortType} onChangeSort={(i) => setSortType(i)}*/}/>

/*
const pizzas = items
    .filter(obj => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    })
    .map(obj => <PizzaBlock key={obj.id} {...obj} />);*/


/** fetch(
 `https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
 )
 .then(res => res.json())
 .then(arr => {

      });*/
