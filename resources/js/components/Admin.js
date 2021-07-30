import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
import Sidebar from './Sidebar';

class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state={
            books:[]
        }
    }
    componentDidMount(){
        axios.get(`/api/adminbooks`).then(response=>{
            this.setState({
                books:response.data
            })
        })
    }
    render(){
        const {books} = this.state
        return(
            <div class="adminpanel">
                <Sidebar/>
                <div class="admincontent">
                    <a href="/admincreatebooks">Create books</a>
                    <hr/>
                    <div class="books--display">
                    {books.map(book=>(
                        <div class="books--display--cards">                        
                        <div class="books--display--cards--image">
                        <img class="books--display--cards--image--image" src={'images/'+book.frontimage}/>
                        <Link to={'/books/'+book.id}>
                        <img class="books--display--cards--image--image2" src={'images/'+book.backimage}/>
                        </Link>
                        </div>
                        <div class="books--display--cards--body">
                            <span>{book.author}</span>
                            <h5>{book.title}</h5><br/><br/>
                            <div class="books--display--cards--body--priceandbutton">
                            <button onClick={()=>this.addtocart(book.id)} class="books--display--cards--body--priceandbutton--button">View details</button>
                            </div>
                        </div>  
                    </div>
                    ))}
                </div>
                </div>
            </div>
        )
    }
};

export default Admin;