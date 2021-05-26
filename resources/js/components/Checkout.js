import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
class Checkout extends React.Component {
    constructor(props){
        super(props);
        this.state={
            books:[],
            TotalPrice:'',
            coupon:[],
            full_name:'',
            email:'',
            address:'',
            city:'',
            phone:'',
            state:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        axios.get(`/api/getcart`).then(response=>{
            const bookscart = response.data[0];
            const CartTotal = response.data[1];
            const couponsession = response.data[2];
            JSON.parse(JSON.stringify(bookscart));
            JSON.parse(JSON.stringify(CartTotal));
            JSON.parse(JSON.stringify(couponsession));
            this.setState({
                books:Object.values(bookscart),
                TotalPrice:CartTotal,
                coupon:couponsession
            })
            console.log(this.state.coupon)
        })
    }
    handleInputChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const userinput ={
            full_name:this.state.full_name,
            email:this.state.email,
            address:this.state.address,
            phone:this.state.phone,
            city:this.state.city,
            state:this.state.state,
        }
        axios.post(`/api/submitorder`,userinput).then(response=>{

        }).catch(error=>{
            console.log(error.response.data);
        })
    }
    render(){
        const {books,TotalPrice,coupon} = this.state
        return(
                <div class="checkout">
                    <div class="orderform">
                        <h3>Billing address</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div class="billingdetails">
                                <div class="billingdetails--inputbox">
                                    <span class="billingdetails--details">Full Name</span>
                                    <input onChange={this.handleInputChange} name="full_name" value={this.state.full_name} 
                                    class="billingdetails--input" type="text" placeholder="Enter you name" required />
                                </div>
                                <div class="billingdetails--inputbox">
                                <span class="billingdetails--details">Email Address</span>
                                <input onChange={this.handleInputChange} name="email" value={this.state.email} 
                                 class="billingdetails--input" type="text" placeholder="Enter your email" required />
                                </div>
                                <div class="billingdetails--inputbox">
                                <span class="billingdetails--details">Address</span>
                                <input onChange={this.handleInputChange} name="address" value={this.state.address} 
                                 class="billingdetails--input" type="text" placeholder="Enter you address" required />
                                </div>
                                <div class="billingdetails--inputbox">
                                <span class="billingdetails--details">Phone Number</span>
                                <input onChange={this.handleInputChange} name="phone" value={this.state.phone} 
                                 class="billingdetails--input" type="text" placeholder="Enter your phone number" required />
                                </div>
                                <div class="billingdetails--inputbox">
                                <span class="billingdetails--details">City</span>
                                <input onChange={this.handleInputChange} name="city" value={this.state.city} 
                                 class="billingdetails--input" type="text" placeholder="Enter your city" required />
                                </div>
                                <div class="billingdetails--inputbox">
                                <span class="billingdetails--details">State</span>
                                <input onChange={this.handleInputChange} name="state" value={this.state.state} 
                                 class="billingdetails--input" type="text" placeholder="Enter your state" required />
                                </div>
                                <button class="billingdetails--button" type="submit">Submit Order</button>
                                <Link to="/cart"><button class="billingdetails--button2">Go back to cart</button></Link>    
                            </div>
                        </form>
                    </div>
                    <div class="orderitems">
                        <h4 style={{textAlign:'center'}}>Checkout Items</h4><hr/>
                        {books.map(book=>(
                            <div class="orderitems--items">
                            <div class="orderitems--items">{book.item.title}</div>
                            <div class="orderitems--items">{book.qty}</div>
                            <div class="orderitems--items">$ {book.item.price}</div>
                            </div>
                        ))}
                        <hr/>
                        <div class="orderitems--total">
                        <div class="orderitems--total">Total</div>
                        <div class="orderitems--total">$ {TotalPrice}</div>
                        </div>
                        {coupon ? 
                            <div class="orderitems--couponapplied">
                            <div class="orderitems--couponapplied">Coupon applied</div>
                            <div class="orderitems--couponapplied">- $ {coupon.discount}</div>
                        </div> : null}
                        <hr/>
                        {coupon ? 
                            <div class="orderitems--grandtotal">
                            <div class="orderitems--grandtotal">Grand Total</div>
                            <div class="orderitems--grandtotal">$ {TotalPrice - coupon.discount}</div>
                            </div>: 
                        <div class="orderitems--grandtotal">
                        <div class="orderitems--grandtotal">Grand Total</div>
                        <div class="orderitems--grandtotal">$ {TotalPrice}</div>
                        </div>}
                    </div>
                </div>
        )
    }
};

export default Checkout;