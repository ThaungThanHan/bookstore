import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
class Header extends React.Component {
    constructor(props){
        super(props);
        this.state={
            books:[],
            loggeduser:{},
            subnav:false
        }
        this.showSubNav = this.showSubNav.bind(this);
        this.logout = this.logout.bind(this);

    }
    componentDidMount(){
        axios.get(`/api/getcart`).then(response=>{
            const bookscart = response.data[0];
            JSON.parse(JSON.stringify(bookscart))
            this.setState({
                books:Object.values(bookscart)
            })
        })
        axios.get(`/api/loggeduser`).then(response=>{
            this.setState({
                loggeduser:response.data
            })
            console.log(this.state.loggeduser)
        })
        
    }
    showSubNav(){
        this.setState(prevState => ({
            subnav: !prevState.subnav
          }));
    }
    logout(){
        axios.post(`/api/loggingout`).then(response=>{
            console.log(response.data)
            window.location = "/"
        }).catch(error=>{
            console.log(error.response.data)
        })
    }
    render(){
        const {books,loggeduser,subnav} = this.state
        return(
                <div class="nav-container">
                    <nav>
                        <ul class="firstnav">
                            <li><Link to="books">Shop</Link></li>
                            {loggeduser.name ? 
                                <div>
                                <li style={{cursor:"pointer"}}>{loggeduser.name}</li> 
                                </div>                     
                                : 
                                null }
                        </ul>
                    </nav>
                    <Link to="/"><img class="logo" src={logo} /></Link>
                    <nav>
                    <ul class="secondnav">
                        {loggeduser.name ? 
                            <div>
                            <li style={{cursor:"pointer"}} onClick={()=>this.logout()}>Logout</li> 
                            </div>                     
                            : 
                            <li><Link to="logging">Login/Register</Link></li> }
                        <li><Link to='/cart'><i class="fa fa-shopping-cart" aria-hidden="true"></i></Link></li>        
                        <span class="secondnav--span">{books.length}</span>
                    </ul>
                </nav>
                </div>
        )
    }
};

export default Header;