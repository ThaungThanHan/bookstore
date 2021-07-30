import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
import {FaCheck} from "react-icons/fa";
import {FaTimes} from "react-icons/fa";
import Sidebar from './Sidebar';

class ActiveOrders extends React.Component {
    constructor(props){
        super(props);
        this.state={
            orders:[],
            isModalOpen:false,
            orderitems:[],
        }
        this.setModalOpen = this.setModalOpen.bind(this);
        this.setModalClose = this.setModalClose.bind(this);
        this.confirmorder = this.confirmorder.bind(this);
    }
    setModalOpen(id){
        axios.get(`/api/getorderitems/${id}`).then(response=>{
            const responseitems = response.data;
            JSON.parse(JSON.stringify(responseitems))
            this.setState(prevState=>({
                orderitems:Object.values(responseitems),
            }))
            console.log(this.state.orderitems)
            this.setState(prevState=>({
                isModalOpen:true
            }))
        })

    }
    setModalClose(){
        this.setState(prevState=>({
            isModalOpen:false
        }))
    }
    confirmorder(id){
        axios.get(`/api/confirmorder/${id}`).then(response=>{
            window.location.reload()
        })
    }
    componentDidMount(){
        axios.get(`/api/getactiveorders`).then(response=>{
            this.setState({
                orders:response.data
            })
    })}
    render(){
        const {orders,orderitems} = this.state
        return(
                    <table style={{width:'100%'}}class="tg">
                    <thead>
                    <tr>
                        <th style={{width:'5%',textAlign:'center'}}class="tg-0pky">Order ID</th>
                        <th style={{width:'5%',textAlign:'center'}}class="tg-0pky">Created</th>
                        <th style={{width:'10%',textAlign:'center'}}class="tg-0pky">Full name</th>
                        <th style={{width:'15%',textAlign:'center'}} class="tg-0pky">Email</th>
                        <th style={{width:'15%',textAlign:'center'}} class="tg-0pky">Phone number</th>
                        <th style={{width:'5%',textAlign:'center'}}class="tg-0pky">Items</th>
                        <th style={{width:'6%',textAlign:'center'}} class="tg-0pky">Grand Total</th>
                        <th style={{width:'10%',textAlign:'center'}} class="tg-0pky">Status</th>
                        <th style={{width:'25%',textAlign:'center'}} class="tg-0pky">Actions</th>
                    </tr>
                    </thead>
                    <tbody style={{textAlign:'center'}}>
                        {orders.map(order=>{
                            return(
                                <tr>
                                <td>
                                    <p>{order.id}</p>                                
                                </td>
                                <td>
                                    <p>{order.created_at}</p>                                
                                </td>
                                <td>
                                    <p>{order.full_name}</p>                                
                                </td>
                                <td>
                                    <p>{order.email}</p>
                                </td>
                                <td>
                                    <p>{order.phone}</p>
                                </td>
                                <td>
                                    <button class="Modal--itemslist--view" onClick={()=>this.setModalOpen(order.id)}>View</button>
                                    <Modal className="Modal" style={{width:'2rem'}} isOpen={this.state.isModalOpen} onRequestClose={()=>this.setModalClose()}>
                                        <div class="Modal--itemslist">
                                            <h3>Order Items</h3>
                                            <button onclick={this.props.onRequestClose} class="Modal--itemslist--close"><FaTimes/></button>
                                            <hr/>
                                            <table style={{width:'100%'}}class="tg">
                                            <thead style={{borderBottom:'1px solid #ccc'}}>
                                            <tr>
                                                <th style={{width:'20%',textAlign:'center'}}class="tg-0pky">Title</th>
                                                <th style={{width:'5%',textAlign:'center'}}class="tg-0pky">Price</th>
                                                <th style={{width:'5%',textAlign:'center'}}class="tg-0pky">Quantity</th>
                                                <th style={{width:'5%',textAlign:'center'}}class="tg-0pky">Total</th>
                                            </tr></thead>
                                            <tbody style={{textAlign:'center'}}>
                                            {orderitems.map(item=>(
                                                <tr>
                                                    <td>
                                                        {item.item.title}
                                                    </td>
                                                    <td>
                                                        $ {item.item.price}
                                                    </td>
                                                    <td>
                                                        {item.qty}
                                                    </td>
                                                    <td>
                                                        $ {item.price}
                                                    </td>                                            
                                                </tr>
                                            ))}
                                            </tbody>
                                            </table>
                                            <hr/>
                                            <div style={{display:'flex',marginLeft:'37.8rem'}} class="Modal--itemslist--grandtotal">
                                                <p style={{marginRight:'.5rem'}}>Grand Total:</p>
                                                <p>$ {order.grand_total}</p>
                                            </div>
                                        </div>
                                    </Modal>
                                </td>         
                                <td>
                                    <p>$ {order.grand_total}</p>
                                </td>
                                <td>
                                    {order.is_confirmed == 1 ?
                                        <p class="confirmbutton">Active</p>
                                     :  <p class="notconfirmbutton">Not Confirmed</p>}
                                </td>    
                                <td>
                                {order.is_confirmed == 1 ?
                                    <div class="actionbuttons">
                                    <button class="actionbutton--approve"><FaCheck/></button>
                                    <button class="actionbutton--cancel"><FaTimes/></button>
                                    </div>
                                 :  
                                 <div class="actionbuttons">
                                 <button onClick={()=>this.confirmorder(order.id)} class="actionbutton--approve"><FaCheck/></button>
                                 <button class="actionbutton--cancel"><FaTimes/></button>
                                 </div>}
                                </td>    
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
            
        )
    }
};

export default ActiveOrders ;