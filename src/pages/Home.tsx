import qs from 'qs';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sortList } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  //const { searchValue } = useContext(SearchContext);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter); //state={filter: {categoryId: 0, sort: {…}}   //const { sortType } = useSelector((state) => state.filter.sort.sortProperty)
  const { items, status } = useSelector(selectPizzaData); //in: selector

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx)); //console.log(setCategoryId(id));//вызов метода (из редакса) возвращает action {type: 'filters/setCategoryId', payload: 1}
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : ''; // const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      //@ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0); //САМ ДОБАВИЛ!!!
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  //2.Если изменили параметры и был первый рендер...     Не вшивать в ссылку  в адресную строку параметры фильтров, а только - Если был первый рендер, проверяй, нужно ли их вшивать в адресную строку или нет 1) Первого рендера не было 2) isMounted.current = true --> сделали, что первый рендер был
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`); //console.log(queryString)   //sortProperty=rating&categoryId=0&currentPage=1
    }
    isMounted.current = true; //после 1-го рендера
  }, [categoryId, sort.sortProperty, currentPage]);

  //1.Если был первый рендео, то проверяем url-параметры и сохраняем в редакс (парсим их из адресной строки в обьект и передаем его в редакс)
  useEffect(() => {
    if (window.location.search) {
      fetchPizzas(); //Убрать !!!
      const params = qs.parse(window.location.search.substring(1)); // console.log(params) //{sortProperty: 'rating', categoryId: '2', currentPage: '1'}
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true; //нужно ли делать поиск
    }
  }, []);

  //3. Если был первый рендер, то запрашиваем пиццы. Нужно мне делать запрос на изменение пиц (да, получаем инфу от пицц).
  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
    /*if (!isSearch.current) {
      getPizzas();
    }*/
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //const pizzas = items.map(obj => <Link to={`/pizza/${obj.id}`}  key={obj.id}><PizzaBlock  {...obj} /></Link>);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕 </h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

/**
 import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sortList } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import React, { useContext, useEffect, useState, useRef } from 'react';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(state => state.filter); //state={filter: {categoryId: 0, sort: {…}}
  //const { sortType } = useSelector((state) => state.filter.sort.sortProperty)

  const sortType = sort.sortProperty; //const sortType = useSelector((state)=>state.filter.sort.sortProperty) //state={filter: {categoryId: 0, sort: {…}}

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  /!**const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности',sortProperty: 'rating',});*!/

  const onChangeCategory = id => {
    dispatch(setCategoryId(id)); //console.log(setCategoryId(id));//вызов метода (из редакса) возвращает action {type: 'filters/setCategoryId', payload: 1}
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = async() => {
    setLoading(true);
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : ''; // const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

     try{
       const res= await axios.get(`https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,)
       setItems(res.data);
     } catch(err) {
       console.log("Error", err);
       alert("Ошибка при получении пицц.")
     } finally {
       setLoading(false);
     }


    window.scrollTo(0,0)//САМ ДОБАВИЛ!!!

  };

  //2.Если изменили параметры и был первый рендер...     Не вшивать в ссылку  в адресную строку параметры фильтров, а только - Если был первый рендер, проверяй, нужно ли их вшивать в адресную строку или нет 1) Первого рендера не было 2) isMounted.current = true --> сделали, что первый рендер был
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`); //console.log(queryString)   //sortProperty=rating&categoryId=0&currentPage=1
    }
    isMounted.current = true; //после 1-го рендера
  }, [categoryId, sort.sortProperty, currentPage]);

  //1.Если был первый рендео, то проверяем url-параметры и сохраняем в редакс (парсим их из адресной строки в обьект и передаем его в редакс)
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)); // console.log(params) //{sortProperty: 'rating', categoryId: '2', currentPage: '1'}
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true; //нужно ли делать поиск
    }
  }, []);

  //3. Если был первый рендер, то запрашиваем пиццы. Нужно мне делать запрос на изменение пиц (да, получаем инфу от пицц).
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
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
 */

//___________________________________________________________________________________
//1. что такое obj ? - это обьект пицц, пришедший из сервера

/*
category: 3
id: 4
imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
price: 415
rating: 8
sizes: [26, 30, 40]
title: "Чизбургер-пицца"
types: [0, 1]
*/

/**
 axios
 .get(
 `https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
 )
 .then((res) => {
        setItems(res.data);
        setLoading(false);
      }).catch((err) => {
        setLoading(false)
      })
 */

//Парсинг параметров из URL и сохранение их в адресную строчку

/*
const pizzas = items.filter(obj => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    })
    .map(obj => <PizzaBlock key={obj.id} {...obj} />);*/

/* fetch(
 `https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,).then(res => res.json()).then(arr => {
      setItems(arr);
        setLoading(false);
      });*/
