import './scss/app.scss';
import Header from './components/Header';
import React, {useState} from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';

function App() {
    const [searchValue, setSearchValue] =useState("")
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home  searchValue={searchValue}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
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
