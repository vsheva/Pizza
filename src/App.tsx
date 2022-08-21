import React, { useState } from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

/** //Template//
 
function App() {

    /!*   function Parent({children}) {
           return (
               <div>
                   <h1>Заголовок</h1>
                   <Outlet/>
                   <h4> Родитель</h4>
               </div>
           )
       }
   *!/

    return (
        <div className="wrapper">
            <Header />
            {/!*<Parent> Из аппа</Parent>*!/}
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/pizza/:id" element={<FullPizza />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
*/

