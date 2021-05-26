import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import frontimage from '../../images/narutofront.jpg';

import Header from '../components/Header';
import ShopBook from '../components/ShopBook';
axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  }
class CartPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            books:[],
            TotalPrice:'',
            coupon_code:'',
            coupon:[]
        }
        this.incrementqty = this.incrementqty.bind(this);
        this.decrementqty = this.decrementqty.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.handleApplyCoupon = this.handleApplyCoupon.bind(this);
        this.onChangeCoupon = this.onChangeCoupon.bind(this);
        this.removeCoupon = this.removeCoupon.bind(this);

    }
    componentDidMount(){
        axios.get(`/api/getcart`).then(response=>{
            const bookscart = response.data[0];
            const CartTotal = response.data[1];
            const couponsession = response.data[2];
            JSON.parse(JSON.stringify(bookscart))
            JSON.parse(JSON.stringify(CartTotal))
            JSON.parse(JSON.stringify(couponsession))

            this.setState({
                books:Object.values(bookscart),
                TotalPrice:CartTotal,
                coupon:couponsession
            })
            console.log(this.state.coupon)

        })
    }
    incrementqty(id){
        axios.get(`/api/addtocart/${id}`).then(response=>{
            window.location.reload()
        })
        
    }
    decrementqty(id){
        axios.get(`/api/removefromcart/${id}`).then(response=>{
            window.location.reload()
        })
    }
    removeItem(id){
        axios.get(`/api/removeitem/${id}`).then(response=>{
            window.location.reload()
        })
    }
    handleApplyCoupon(e){
        e.preventDefault();
        // window.location.reload()
        const coupon_code = this.state.coupon_code;
        axios.post(`/api/coupon`,{coupon_code:coupon_code}
        ).then(response=>{
            JSON.stringify(coupon_code)
            window.location.reload()
            // console.log(response.data)
        }).catch(error=>{
            console.log(error.response)
        })
    }
    onChangeCoupon(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    removeCoupon(event){
        axios.delete(`/api/coupon`).then(response=>{
            window.location.reload();
        }).catch(error=>{
            console.log(error.response)
        })
    }


    render(){
        const {books,TotalPrice,coupon} = this.state
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
                                    <button onClick={()=>this.removeItem(book.item.id)} style={{border:'none',backgroundColor:'#f8f8f8',color:'#DC8920'}}> Remove </button>
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td style={{textAlign:'center'}} class="tg-0pky">
                            <div class="qtyplusminus">
                            <button onClick={()=>this.decrementqty(book.item.id)} type="submit" disabled={book.qty==1}
                             style={{border:'1px solid blue',padding:'.4rem',borderRadius:'50%'}}> - </button>
                            <span style={{border:'1px solid grey',padding:'.5rem'}}> {book.qty} </span>
                                <button onClick={()=>this.incrementqty(book.item.id,event)} type="submit" style={{border:'1px solid blue',padding:'.4rem',borderRadius:'50%'}}> + </button>
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
                {coupon ? 
                <div>
                <div class="summary--subtitle">
                    <p> DISCOUNT({coupon.name}) </p>
                    <p> - $ {coupon.discount} </p>
                </div>
                <span><button onClick={this.removeCoupon} style={{border:'none',backgroundColor:'#F6355E',color:'white'}}>Remove Coupon</button></span>
                </div>
                :
                    <div class="summary--promocode">
                    <p> PROMO CODE </p>
                    <form onSubmit={this.handleApplyCoupon}>
                    <input onChange={this.onChangeCoupon} value={this.state.value} style={{marginBottom:'2rem',width:'100%',padding:'1rem',fontSize:'1rem'}} name="coupon_code" type="text" placeholder="Enter promo code"></input>
                    <button type="submit" href='#' class="summary--button">Apply</button>
                    </form>
                    </div>
                }
                <div class="summary--checkout">
                    <div class="summary--checkout--total"> 
                        <p style={{fontWeight:'bold'}}>GRAND TOTAL</p>
                        {coupon ? <p style={{fontWeight:'bold'}}>$ {TotalPrice - coupon.discount}</p> : <p style={{fontWeight:'bold'}}>$ {TotalPrice}</p>}
                    </div>
                    <a href="/checkout" class="summary--checkout--button"> CHECKOUT </a>
                </div>
            </div>
            </div>
            }
            </div>
        )
    }
};

export default CartPage;