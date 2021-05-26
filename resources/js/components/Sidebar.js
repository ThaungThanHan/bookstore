import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            books:[]
        }
    }
    render(){
        return(
            <div class="adminsidebar">
                <h3 style={{textAlign:'center',borderBottom:'1px solid #ccc',width:'100%',height:'3rem'}}>Admin Panel</h3>
                <div class="adminsidebar--links">
                    <a class="adminsidebar--links--link" href="#">Books</a>
                </div>
                <div class="adminsidebar--links">
                    <a class="adminsidebar--links--link" href="#">Coffee</a>
                </div>
                <div class="adminsidebar--links">
                    <a class="adminsidebar--links--link" href="#">Accessories</a>
                </div>
                <div class="adminsidebar--links">
                    <a class="adminsidebar--links--link" href="#">Orders</a>
                </div>                
                </div>
        )
    }
};

export default Sidebar;