import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
import styled from 'styled-components';
import { FaBook, FaRegListAlt } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

const SidebarLink = styled(Link)`
    display:flex;
    padding:.5rem 4rem;
    justify-content: space-between;height:3rem;margin-top:-.5rem;margin-bottom: 0;
    // border:1px solid blue;
    cursor: pointer;transition:all .5s;
    &:hover{
        background-color: rgb(250, 204, 143);
        text-decoration: none;
    }
`;
const SidebarLabel = styled.span`
    margin-left:1rem;
    &:hover{
        color:black
    }
`;
const DropdownLink = styled(Link)`
display:flex;
padding:.5rem 4rem;
justify-content: space-between;height:3rem;margin-top:-1rem;margin-bottom: 0;
// border:1px solid blue;
cursor: pointer;transition:all .5s;
transform:translateY(1rem);z-index:-1;
&:hover{
    background-color: antiquewhite;
    text-decoration: none;
}
&:not(:last-child){
    margin-bottom:1rem;
}

`;
class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            subnav:false
        }
        this.showSubNav = this.showSubNav.bind(this);
    }
    showSubNav(){
        this.setState(prevState => ({
            subnav: !prevState.subnav
          }));
    }
    render(){
        const {subnav} = this.state;
        return(
            <div class="adminsidebar">
                <h3 style={{textAlign:'center',borderBottom:'1px solid #ccc',width:'100%',height:'3rem'}}>Admin Panel</h3>
                <div class="adminsidebar--links">
                    <div>
                    <FaBookOpen/>
                    <a class="adminsidebar--links--link" href="#">Books</a>
                    </div>
                </div>
                <div class="adminsidebar--links">
                    <a class="adminsidebar--links--link" href="#">Coffee</a>
                </div>
                <div class="adminsidebar--links">
                    <a class="adminsidebar--links--link" href="#">Accessories</a>
                </div>
                    <SidebarLink onClick={this.showSubNav}>
                        <div>
                            <FaRegListAlt />
                            <SidebarLabel>Orders</SidebarLabel>
                        </div>
                        <div>
                            {subnav ? <FaArrowUp/> : <FaArrowDown/>}
                        </div>
                    </SidebarLink>
                    {subnav ?
                        <DropdownLink>
                        <SidebarLabel>Confirm orders</SidebarLabel>
                        </DropdownLink>
                    : null
                    }   
                    {subnav ?
                        <DropdownLink>
                        <a href="/admin/orders"><SidebarLabel>Order List</SidebarLabel></a>
                        </DropdownLink>
                    : null
                    }
                </div>
        )
    }
};

export default Sidebar;