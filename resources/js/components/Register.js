import axios from 'axios';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import {BrowserRouter,Route, Link, Switch} from 'react-router-dom';
import logo from '../../images/Bookadian.png';
class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            confirm_password:''
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleRegister(e){
        e.preventDefault();
        const userinput = {
            name: this.state.name,
            password:this.state.password,
            email:this.state.email,
            confirm_password:this.state.confirm_password
        }
        axios.post(`/api/register`,userinput).then(response=>{
            history.push('/')
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
                    <h1>Join us! Start shopping today!</h1>
                    <form onSubmit={this.handleRegister}>
                    <div class="billingdetails--inputbox">
                    <span class="billingdetails--details">Name</span>
                    <input style={{width:'30rem'}} name="name" onChange={this.handleInputChange} value={this.state.name} class="billingdetails--input" type="text" placeholder="Enter you name" required />
                    </div>
                    <div class="billingdetails--inputbox">
                    <span class="billingdetails--details">Email Address</span>
                    <input style={{width:'30rem'}} name="email" onChange={this.handleInputChange} value={this.state.email} class="billingdetails--input" type="text" placeholder="Enter you email" required />
                    </div>
                    <div class="billingdetails--inputbox">
                    <span class="billingdetails--details">Password</span>
                    <input style={{width:'30rem'}} name="password" onChange={this.handleInputChange} value={this.state.password} class="billingdetails--input" type="password" placeholder="Enter password" required />
                    </div>
                    <div class="billingdetails--inputbox">
                    <span class="billingdetails--details">Confirm Password</span>
                    <input style={{width:'30rem'}} name="confirm_password" onChange={this.handleInputChange} value={this.state.confirm_password} class="billingdetails--input" type="password" placeholder="Confirm password" required />
                    </div>
                    <button class="billingdetails--button" type="submit">Register</button>
                    </form>
                    <span>Already have an account? <a href="/logging">Log in here!</a></span>
                </div>  
            </div>
        )
    }
};

export default Register;