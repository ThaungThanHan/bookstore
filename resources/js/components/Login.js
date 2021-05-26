import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleRegister(e){
        e.preventDefault();
        const userinput = {
            email:this.state.email,
            password:this.state.password,
        }
        axios.post(`/api/login`,userinput).then(response=>{
            console.log(response.data)
        }).catch(error=>{
            console.log(error.response.data)
        })
    }
    handleInputChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render(){
        return(
            <div class="registration">
                <div  class="reigsterform">
                    <h1 style={{textAlign:'center'}}>Login and start shopping!</h1>
                    <form onSubmit={this.handleRegister}>
                    <div class="billingdetails--inputbox">
                    <span class="billingdetails--details">Email</span>
                    <input style={{width:'30rem'}} name="email" onChange={this.handleInputChange} value={this.state.email} class="billingdetails--input" type="text" placeholder="Enter your email" required />
                    </div>
                    <div class="billingdetails--inputbox">
                    <span class="billingdetails--details">Password</span>
                    <input style={{width:'30rem'}} name="password" onChange={this.handleInputChange} value={this.state.password} class="billingdetails--input" type="password" placeholder="Enter password" required />
                    </div>
                    <button class="billingdetails--button" type="submit">Login</button>
                    </form>
                    <span>Want to join? <a href="/registration">Register</a></span>
                </div>  
            </div>
        )
    }
};

export default Login;