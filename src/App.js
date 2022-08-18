import React, { useState } from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';


function App() {

  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
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
