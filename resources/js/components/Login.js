import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch, Redirect} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            loggeduser:{}
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount(){
        axios.get(`/api/loggeduser`).then(response=>{
            this.setState({
                loggeduser:response.data
            })
            console.log(this.state.loggeduser)
        })
    }
    handleLogin(e){
        e.preventDefault();
        const userinput = {
            email:this.state.email,
            password:this.state.password,
        }
        axios.post(`/api/logging`,userinput).then(response=>{
            window.location = "/"
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
        const {loggeduser} = this.state;
        return(
            <div>
                    {loggeduser.name ?
                        <Redirect to="/" />
                        :
                        <div class="registration">
                        <div  class="reigsterform">
                        <h1 style={{textAlign:'center'}}>Login and start shopping!</h1>
                        <form onSubmit={this.handleLogin}>
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
                        }
        </div>
        )
    }
};

export default Login;