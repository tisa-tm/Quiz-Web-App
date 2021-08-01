import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    
        this.state={
            username: "username",
            password: "password"
        }
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
    }
    async onSubmit(e) {
        e.preventDefault();
        const user = {
          username: this.state.username,
          password: this.state.password
        }
        try{ 
            const res = await axios.post('http://localhost:5000/user/login', user, { withCredentials: true });//for cookie, make change in cors as well
            if(res.data.message == "user valid"){
                window.location.href = 'http://localhost:3000/';
            }
        }catch(error){
            console.log(error);
        }
        this.setState({
          username: "",
          password: ""
        });
      }

    render(){
        return (
            <form onSubmit={this.onSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" placeholder={this.state.username} onChange={this.onChangeUsername} required/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" placeholder={this.state.password} onChange={this.onChangePassword} required/>
                <button type="submit">Login</button>
            </form>
        );
    }
}

export default Login;