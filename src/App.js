import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import Header from './components/Header';
import React, { useState } from 'react';



//useSelector вытаскиевает данные из хранилища, useDispatch -сделай что-то
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, test } from './redux/slices/filterSlice' //actions

//console.log("test() : ", test() ) //1. {type: 'myCounterRedux/test', payload: undefined}
//console.log("decrement() : ", decrement() ) //2.{type: 'myCounterRedux/decrement', payload: undefined}


export const SearchContext = React.createContext();


function App() {
  const [searchValue, setSearchValue] = useState('');


    const count = useSelector((state) => state.counter.count) //  console.log("state", state) // state= {counter: {count:0});
    const dispatch = useDispatch();

    console.log("dispatch: ", dispatch) //2.dispatch() {return !window.__REDUX_DEVTOOLS_EXTENSION_LOCKED__ && o.dispatch.apply(o, arguments);}


  return (
    <div className="wrapper">
        <button
            aria-label="Increment value"
            onClick={() => dispatch(test())}
        >
            Increment
        </button>
        <span>{count}</span>
        <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
        >
            Decrement
        </button>



      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

/*
{items.map(obj => (
    <PizzaBlock key={obj.id} {...obj} />
))}
*/

/*
<Index title="Mexican" price={"500"} />
<Index title="Vegetarian" price={350} />*/
