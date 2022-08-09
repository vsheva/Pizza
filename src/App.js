import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import React, {useEffect, useState} from "react";
import pizzas from "./assets/pizzas.json"




function App() {
let [items, setItems]= useState([]);

useEffect(()=>{
    fetch("https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks")
        .then(res=> res.json())
        .then(arr=>setItems(arr)
           // items=arr
        )

},[])



  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj)=>(
              <PizzaBlock id={obj.id} {...obj}

              />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



/*
<Index title="Mexican" price={"500"} />
<Index title="Vegetarian" price={350} />*/
