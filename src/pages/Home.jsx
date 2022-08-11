import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import React, {useEffect, useState} from 'react';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: "популярности",
        sortProperty: "rating"
    });


//урок 9 31 минута
    useEffect(() => {
        setLoading(true);

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy =sortType.sortProperty.replace("-",'')
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        fetch(`https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks?${category}&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(arr => {
                setItems(arr); // items=arr
                setLoading(false);
            });
        window.scrollTo(0, 0); //в Home.jsx при первом рендере чтобы перекидывало вверх
    }, [categoryId, sortType]);


    console.log(categoryId, sortType)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                    : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
        </div>
    );
};

export default Home;