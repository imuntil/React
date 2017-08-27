import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import HomePage from "./routes/HomePage.js";

import ProductAll from './routes/Product/All.js'
import ProductFilter from './routes/Product/Filter.js'

import CocktailPage from "./routes/CocktailPage.js";

import CartPage from "./routes/CartPage.js";


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/Home" component={HomePage} />
      <Route path="/product/all" component={ProductAll} />
      <Route path="/product/filter" component={ProductFilter} />
      <Route path="/Cocktail" component={CocktailPage} />
      <Route path="/Cart" component={CartPage} />
    </Router>
  );
}

export default RouterConfig;
