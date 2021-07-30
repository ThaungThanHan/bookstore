import axios from 'axios';
import React from 'react';
const FormData = require('form-data');
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
import Sidebar from './Sidebar';

class AdminCreateBooks extends React.Component {
    constructor(props){
        super(props);
        this.state={
            books:[],
            title:'',
            author:'',
            edition:'',
            genre:'',
            genre2:'',
            genre3:'',
            price:'',
            description:'',
            rating:'',
            printlength:'',
            language:'',
            publisher:'',
            dimensions:'',
            isbn10:'',
            isbn13:'',
            frontimage:[],
            backimage:[]
        }
        this.handleCreateBooks = this.handleCreateBooks.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlefrontimagechange = this.handlefrontimagechange.bind(this);
        this.handlebackimagechange = this.handlebackimagechange.bind(this);
    }
    handleInputChange(event){
        this.setState({
            [event.target.name] : event.target.value,
        })
    }
    handlefrontimagechange(event){
        this.setState({
            frontimage:event.target.files[0]
        })
        window.removeEventListener
        console.log(this.state.frontimage);
    }
    handlebackimagechange(event){
        this.setState({
            backimage:event.target.files[0]
        })
        window.removeEventListener
        console.log(event.target.files[1]);
    }
    handleCreateBooks(e){
        e.preventDefault();
        const admininput = {
            title:this.state.title,
            edition:this.state.edition,
            author:this.state.author,
            genre:this.state.genre,
            genre2:this.state.genre2,
            genre3:this.state.genre3,
            price:this.state.price,
            description:this.state.description,
            rating:this.state.rating,
            printlength:this.state.printlength,
            language:this.state.language,
            publisher:this.state.publisher,
            dimensions:this.state.dimensions,
            isbn10:this.state.isbn10,
            isbn13:this.state.isbn13,
        }
        const {frontimage,backimage} = this.state;
        const formData = new FormData();    // FormData is so good, can be used when sending multiple form data to axios post
        formData.append('frontimage',frontimage);
        formData.append('backimage',backimage);
        formData.append('admininput',JSON.stringify(admininput));
        axios({
            method: 'post',
            url: '/api/admincreatebooks',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                console.log(response.data)
            }).catch(error=>{
            console.log(error.response.data);
        })
    }

    render(){
        return(
            <div class="adminpanel">
                <Sidebar/>
                <div class="admincontent">
                    <a href="/admin">Go back</a>
                    <hr/>
                    <div class="createbooksform">
                        <form onSubmit={this.handleCreateBooks}>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Title</span>
                        <input style={{width:'30rem'}} name="title" onChange={this.handleInputChange} value={this.state.title} class="billingdetails--input" type="text" placeholder="Enter title" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Edition</span>
                        <input style={{width:'30rem'}} name="edition" onChange={this.handleInputChange} value={this.state.edition} class="billingdetails--input" type="text" placeholder="Enter you edition" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Author</span>
                        <input style={{width:'30rem'}} name="author" onChange={this.handleInputChange} value={this.state.author} class="billingdetails--input" type="text" placeholder="Enter you author" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Genre</span>
                        <input style={{width:'30rem'}} name="genre" onChange={this.handleInputChange} value={this.state.genre} class="billingdetails--input" type="text" placeholder="Enter you genre" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Genre2</span>
                        <input style={{width:'30rem'}} name="genre2" onChange={this.handleInputChange} value={this.state.genre2} class="billingdetails--input" type="text" placeholder="Enter you genre2"  />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Genre3</span>
                        <input style={{width:'30rem'}} name="genre3" onChange={this.handleInputChange} value={this.state.genre3} class="billingdetails--input" type="text" placeholder="Enter you genre3" />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Price</span>
                        <input style={{width:'30rem'}} name="price" onChange={this.handleInputChange} value={this.state.price} class="billingdetails--input" type="text" placeholder="Enter you price" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Description</span>
                        <input style={{width:'30rem'}} name="description" onChange={this.handleInputChange} value={this.state.description} class="billingdetails--input" type="text" placeholder="Enter you description" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Rating</span>
                        <input style={{width:'30rem'}} name="rating" onChange={this.handleInputChange} value={this.state.rating} class="billingdetails--input" type="text" placeholder="Enter you rating" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Printlength</span>
                        <input style={{width:'30rem'}} name="printlength" onChange={this.handleInputChange} value={this.state.printlength} class="billingdetails--input" type="text" placeholder="Enter you printlength" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Language</span>
                        <input style={{width:'30rem'}} name="language" onChange={this.handleInputChange} value={this.state.language} class="billingdetails--input" type="text" placeholder="Enter you language" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Publisher</span>
                        <input style={{width:'30rem'}} name="publisher" onChange={this.handleInputChange} value={this.state.publisher} class="billingdetails--input" type="text" placeholder="Enter you publisher" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Dimensions</span>
                        <input style={{width:'30rem'}} name="dimensions" onChange={this.handleInputChange} value={this.state.dimensions} class="billingdetails--input" type="text" placeholder="Enter you dimensions" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">ISBN10</span>
                        <input style={{width:'30rem'}} name="isbn10" onChange={this.handleInputChange} value={this.state.isbn10} class="billingdetails--input" type="text" placeholder="Enter you isbn10" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">ISBN13</span>
                        <input style={{width:'30rem'}} name="isbn13" onChange={this.handleInputChange} value={this.state.isbn13} class="billingdetails--input" type="text" placeholder="Enter you isbn13" required />
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Front cover </span>
                        <input style={{width:'30rem'}} name="frontimage" onChange={this.handlefrontimagechange} class="billingdetails--input" type="file" placeholder="Enter you frontimage"/>
                        </div>
                        <div class="billingdetails--inputbox">
                        <span class="billingdetails--details">Back cover </span>
                        <input style={{width:'30rem'}} name="backimage" onChange={this.handlebackimagechange} class="billingdetails--input" type="file" placeholder="Enter you frontimage" />
                        </div>
                        <button class="billingdetails--button" type="submit">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

export default AdminCreateBooks;