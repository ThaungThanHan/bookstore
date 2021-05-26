import React from 'react';
import axios from 'axios';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import Header from '../components/Header';
import frontimage from '../../images/narutofront.jpg';
import backimage from '../../images/narutoback.jpg';
import herocoffee from '../../images/herocoffee.png';
import heromark from '../../images/heromark.png';

class ShopBook extends React.Component{
    constructor(props){
        super(props);
        this.state={
            books:[]
        }
        this.addtocart = this.addtocart.bind(this);
    }
    componentDidMount(){
        axios.get('/api/books').then(response => {
            this.setState({
                books: response.data
            })
            console.log(this.state.books);
        })
    }
    addtocart(id){
        axios.get(`/api/addtocart/${id}`).then(response=>{
            window.location.reload();
        })
    }
    
    render(){
        const{books} = this.state;
        return(
            <div class="shopbooks">
                <div class="herogrids">
                    <div class="herogrids--coffee">
                        <div class="herogrids--coffee--body">
                            <p>A good book, coffee</p>
                            <p style={{marginLeft:"15rem"}}>Perfection.</p>
                            <a class="herogrids--coffee--body--button"style={{marginLeft:"1rem"}} href="#">Grab coffee here</a>
                        </div>
                        <img class="herogrids--coffee--image" src={herocoffee} />
                    </div>
                    <div class="herogrids--accessory">
                    <div class="herogrids--accessory--body">
                    <p style={{marginLeft:"1rem"}}>Spice up your reading routine!</p>
                    <a class="herogrids--accessory--body--button"style={{marginLeft:"1rem",marginTop:"4.5rem"}} href="#">Check out accessories</a>
                    </div>

                    <img class="herogrids--accessory--image" src={heromark} />

                    </div>
                </div>
                <div class="books">
                    <div class="books--filter">
                        <div class="books--filter--search">
                            <input type="text" placeholder="Search books"/>
                        </div><hr/>
                        
                    </div>
                    <div class="books--display">
                        {books.map(book=>(
                            <div class="books--display--cards">
                            <div class="books--display--cards--image">
                            <img class="books--display--cards--image--image" src={frontimage}/>
                            <Link to={'/books/'+book.id}>
                            <img class="books--display--cards--image--image2" src={backimage}/>
                            </Link>
                            </div>
                            <div class="books--display--cards--body">
                                <span>{book.author}</span>
                                <h5>{book.title}</h5><br/><br/>
                                <div class="books--display--cards--body--priceandbutton">
                                <p>$ {book.price}</p>
                                <button onClick={()=>this.addtocart(book.id)} class="books--display--cards--body--priceandbutton--button">Add to cart</button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopBook;