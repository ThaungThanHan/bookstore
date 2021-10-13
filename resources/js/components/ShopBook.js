import React from 'react';
import axios from 'axios';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import Header from '../components/Header';
// import frontimage from '../../images/narutofront.jpg';
// import backimage from '../../images/narutoback.jpg';
import herocoffee from '../../images/herocoffee.png';
import heromark from '../../images/heromark.png';
import { isEmpty } from 'lodash';

class ShopBook extends React.Component{
    constructor(props){
        super(props);
        this.state={
            books:[],
            maincate:[],
            catebooks:[],
            searchData:'',
            currentcate:'',
        }
        this.addtocart = this.addtocart.bind(this);
        this.getCategorized = this.getCategorized.bind(this);
        this.setSearchData = this.setSearchData.bind(this);
    }
    componentDidMount(){
        axios.get('/api/books').then(response => {
            this.setState({
                books: response.data[0],
                maincate:response.data[1]
            })
            console.log(this.state.books);
        })
    }
    addtocart(id){
        axios.get(`/api/addtocart/${id}`).then(response=>{
            window.location.reload();
        })
    }
    getCategorized(id){
        axios.get(`/api/getcategorized/${id}`).then(response=>{
                this.setState({
                    catebooks:response.data,
                    currentcate:id
                })
            console.log(this.state.catebooks)
        })
    }
    setSearchData(searchdata){
        this.setState({
            catebooks: [],
            currentcate:null,
            searchData : searchdata
        })
        console.log(this.state.searchData)
    }
    render(){
        const{books,maincate,catebooks,searchData,currentcate} = this.state;
        let realbooks = books;  // state is read-only. so point it to a varaible to modify it. 
        if(searchData.length > 0 ){                 // filtering the books.
            realbooks = realbooks.filter((val)=>{   // return the condition and filter() will do its job.
                return val.title.toLowerCase().match(searchData.toLowerCase());
            })
        }
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
                            <input onChange={(event)=>this.setSearchData(event.target.value)} class="books--filter--searchbar" type="text" placeholder="Search books"/>
                        </div><hr/>
                        <div class="books--filter--categories">
                            <h3>Categories</h3>
                            {maincate.map(cate=>{
                                return <p className={cate.id == currentcate ? 'books--filter--categories--categoryyes' : 'books--filter--categories--categoryno' } onClick={()=>this.getCategorized(cate.id)}>{cate.name}</p>
                            }

                            )}
                        </div>
                    </div>
                    <div class="books--display">
                        { !currentcate ?
                            realbooks.map(book=>(
                            <div class="books--display--cards">
                            <div class="books--display--cards--image">
                            <img class="books--display--cards--image--image" src={`images/${book.frontimage}`}/>
                            <Link to={'/books/'+book.id}>
                            <img class="books--display--cards--image--image2" src={`images/${book.backimage}`}/>
                            </Link>
                            </div>
                            <div class="books--display--cards--body">
                                <span>{book.author}</span>
                                <h5 style={{height:'2rem'}}>{book.title}</h5><br/><br/>
                                <div class="books--display--cards--body--priceandbutton">
                                <p>$ {book.price}</p>
                                <button onClick={()=>this.addtocart(book.id)} class="books--display--cards--body--priceandbutton--button">Add to cart</button>
                                </div>
                            </div>
                        </div>
                        )) :
                        catebooks.map(book=>{
                            return catebooks.length ?
                            <div class="books--display--cards">
                            {catebooks.length == 0 ? <h2>No books</h2> : null}
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
                        : <h2>No books</h2>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopBook;