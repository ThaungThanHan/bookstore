import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
class Header extends React.Component {
    constructor(props){
        super(props);
        this.state={
            books:[]
        }
    }
    componentDidMount(){
        axios.get(`/api/getcart`).then(response=>{
            const bookscart = response.data[0];
            JSON.parse(JSON.stringify(bookscart))
            this.setState({
                books:Object.values(bookscart)
            })
            console.log(this.state.books)
        })
    }
    render(){
        const {books} = this.state
        return(
                <div class="nav-container">
                    <nav>
                        <ul class="firstnav">
                            <li><Link to="books">Shop</Link></li>
                            <li>Review</li>
                        </ul>
                    </nav>
                    <Link to="/"><img class="logo" src={logo} /></Link>
                    <nav>
                    <ul class="secondnav">
                        <li>Account</li>
                        <li><Link to='/cart'><i class="fa fa-shopping-cart" aria-hidden="true"></i></Link></li>        
                        <span class="secondnav--span">{books.length}</span>   
                    </ul>
                </nav>
                </div>
        )
    }
};

export default Header;