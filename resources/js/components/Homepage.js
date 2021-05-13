import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
import Header from '../components/Header';
import ShopBook from '../components/ShopBook';
class HomePage extends React.Component {
    render(){
        return(
            <div class="main">
                <div class="hero-container">
                    <a class="hero-container--button" href="/books">Shop Books</a>
                    <a class="hero-container--button" href="#">Shop Coffee</a>
                </div>

                <div class="topbest">
                    <h1 class="topbest-headline">Best Sellers</h1>
                    <div class="topbest--cards">
                    <div class="topbest--cards--books">
                        <a href="#">Top Books</a>
                    </div>
                    <div class="topbest--cards--coffee">
                        <a>Top Coffee</a>
                    </div>
                    <div class="topbest--cards--devices">
                        <a>Top Devices</a>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default HomePage;