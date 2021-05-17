import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import frontimage from '../../images/narutofront.jpg';
class DetailsBook extends React.Component {
    constructor(props){
        super(props);
        this.state={
                book:[],
        }
        this.HandleAddToCart = this.HandleAddToCart.bind(this);
        this.HandleRemoveSession = this.HandleRemoveSession.bind(this);
    }
    componentDidMount(){
        axios.get(`/api/books/${this.props.match.params.id}`).then(response=>{
            this.setState({
                book:response.data
            })
            console.log(this.state.book);
        })
    }

    HandleAddToCart(event){
        event.preventDefault()
        const {history} = this.props;
        const id = this.state.book.map(({id})=>id);
        console.log(id)
        axios.get(`/api/addtocart/${id}`).then(
            response=>{
                window.location.href = "http://127.0.0.1:8000/cart";            }
        ).catch(e=>{
            console.log(e)
        })
    }
    HandleRemoveSession(){
            axios.get(`/api/removeallitems`)
    }
    render(){
        const{book} = this.state;
        return(
            <div class="detailsbook">
                <div class="singledisplay">
                    <div class="singledisplay--image">
                    <img class="singledisplay--image--front" src={frontimage}/>
                    </div>
                    <div class="singledisplay--specs">
                        <div class="singledisplay--specs--header">
                            <h5 class="singledisplay--specs--header--text">Title</h5>
                            <h5 class="singledisplay--specs--header--text">Edition</h5>
                            <h5 class="singledisplay--specs--header--text">Author</h5>
                            <h5 class="singledisplay--specs--header--text">Ratings</h5>
                            <h5 class="singledisplay--specs--header--text">Publisher</h5>
                            <h5 class="singledisplay--specs--header--text">Publication Date</h5>

                        </div>
                        <div class="singledisplay--specs--content">
                            {book.map(book=>(
                                <p class="singledisplay--specs--content--text">{book.title}</p>
                            ))}
                            {book.map(book=>(
                                <p class="singledisplay--specs--content--text">{book.edition}</p>
                            ))}
                            {book.map(book=>(
                                <p class="singledisplay--specs--content--text">{book.author}</p>
                            ))}
                            {book.map(book=>(
                                <p class="singledisplay--specs--content--text">{book.rating}</p>
                            ))}
                            {book.map(book=>(
                                <p class="singledisplay--specs--content--text">{book.publisher}</p>
                            ))}
                            {book.map(book=>(
                                <p class="singledisplay--specs--content--text">{book.created_at}</p>
                            ))}
                        </div>
                        <p>{book.title}</p>
                    </div>
                    <div class="singledisplay--addtocart">
                        <div class="singledisplay--addtocart--price">
                                <h3>Price($):</h3>
                                {book.map(book=>(
                                    <h3>{book.price}</h3>
                                ))}
                        </div>
                        <div class="singledisplay--addtocart--button">
                            <form onSubmit={this.HandleAddToCart}>
                                <button type="submit" class="singledisplay--addtocart--button--button">Add to cart</button>
                            </form>
                            <form onSubmit={this.HandleRemoveSession}>
                            <button type="submit" class="singledisplay--addtocart--button--button">Remove session</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default DetailsBook;