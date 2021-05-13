import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import frontimage from '../../images/narutofront.jpg';

import Header from '../components/Header';
import ShopBook from '../components/ShopBook';
class CartPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            books:[],
            TotalPrice:''
        }
        this.incrementqty = this.incrementqty.bind(this);
        this.decrementqty = this.decrementqty.bind(this);
        this.removeItem = this.removeItem.bind(this);

    }
    componentDidMount(){
        axios.get(`/api/getcart`).then(response=>{
            const bookscart = response.data[0];
            const CartTotal = response.data[1];
            JSON.parse(JSON.stringify(bookscart))
            JSON.parse(JSON.stringify(CartTotal))

            this.setState({
                books:Object.values(bookscart),
                TotalPrice:CartTotal
            })
            console.log(this.state.books)

        })
    }
    incrementqty(id){
        window.location.reload()
        axios.get(`/api/addtocart/${id}`)
    }
    decrementqty(id){
        window.location.reload()
        axios.get(`/api/removefromcart/${id}`)
    }
    removeItem(id){
        window.location.reload()
        axios.get(`/api/removeitem/${id}`)
    }
    render(){
        const {books,TotalPrice} = this.state
        return(          
            <div>
            {books.length == 0 ? <h1> Your cart is empty </h1> : 
                <div class="cartpage">  
                <div class="cart">
                <div class="cart--header">
                    <h2>Shopping Cart</h2>
                    <h2>{books.length} items</h2>
                </div>
                <div class="cart--table">
                    <table class="tg">
                    <thead>
                    <tr>
                        <th style={{width:'50%'}}class="tg-0pky">PRODUCT DETAILS</th>
                        <th style={{width:'10%',textAlign:'center'}}class="tg-0pky">QUANTITY</th>
                        <th style={{width:'10%',textAlign:'center'}}class="tg-0pky">PRICE</th>
                        <th style={{width:'10%',textAlign:'center'}} class="tg-0pky">TOTAL</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book=>(
                        <tr>
                        <td class="tg-0pky">
                            <div class="productdetails">
                                <img style={{width:'7rem',height:'8rem',marginRight:'2rem'}}src={frontimage} />
                                <div class="productdetails--details">
                                    <h5 class="productdetails--details--detail">{book.item.title}</h5>
                                    <h6 class="productdetails--details--detail">{book.item.edition}</h6>
                                    <p class="productdetails--details--detail">
                                    <button onClick={()=>this.removeItem(book.item.id)} style={{border:'none',backgroundColor:'white'}}> Remove </button>
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign:'center'}} class="tg-0pky">
                            <div class="qtyplusminus">
                            <button onClick={()=>this.decrementqty(book.item.id)} type="submit" style={{border:'1px solid blue',padding:'.4rem',borderRadius:'50%'}}> - </button>
                            <span style={{border:'1px solid grey',padding:'.5rem'}}> {book.qty} </span>
                                <button onClick={()=>this.incrementqty(book.item.id)} type="submit" style={{border:'1px solid blue',padding:'.4rem',borderRadius:'50%'}}> + </button>
                            </div>
                        </td>
                        <td style={{textAlign:'center'}} class="tg-0pky">$ {book.item.price}</td>
                        <td style={{textAlign:'center'}} class="tg-0pky">$ {book.price}</td>
                    </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </div>
            <div class="summary">
                <div class="summary--header">
                    <h2>Order Summary</h2>
                </div>
                <div class="summary--subtitle">
                    <p> ITEMS {books.length} </p>
                    <p> $ {TotalPrice} </p>
                </div>
                <div class="summary--shipping">
                    <p> SHIPPING </p>
                    <select style={{width:'100%'}}>
                        <option>Select Shipping</option>
                    </select>
                </div>
                <div class="summary--promocode">
                    <p> PROMO CODE </p>
                    <form>
                    <input style={{marginBottom:'2rem',width:'100%',padding:'1rem',fontSize:'1rem'}} type="text" placeholder="Enter promo code"></input>
                    </form>
                </div>
                <a href='#' class="summary--button">Apply</a>
                <div class="summary--checkout">
                    <div class="summary--checkout--total"> 
                        <p>TOTAL COST</p>
                        <p>$462.98</p>
                    </div>
                    <a href="#" class="summary--checkout--button"> CHECKOUT </a>
                </div>
            </div>
            </div>
            }
            </div>
        )
    }
};

export default CartPage;