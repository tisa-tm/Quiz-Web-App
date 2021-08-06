import React, { Component } from 'react';
import axios from 'axios';
import '../component-styles/loginandregister.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeConfirmPassword=this.onChangeConfirmPassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    
        this.state={
            username: "username",
            password: "password",
            confirmPassword: "password"
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
    onChangeConfirmPassword(e) {
        this.setState({
          confirmPassword: e.target.value
        })
    }
    async onSubmit(e) {
        e.preventDefault();
        if (this.state.password!=this.state.confirmPassword){
            alert("The two passwords must match. Check again");
            return;
        }
        const user = {
          username: this.state.username,
          password: this.state.password
        }
        this.setState({
            username: "",
            password: ""
          });
        try{
            let res = await axios.post('http://localhost:5000/user/register', user);
            if(res.data.message){
                alert(res.data.message);
            }
        }catch(error){
            console.log(error);
        }
      }

    render(){
        return (
            <div className="form-holder">
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" placeholder={this.state.username} onChange={this.onChangeUsername} required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" placeholder={this.state.password} onChange={this.onChangePassword} required/>
                    </div>
                    <div>
                        <label htmlFor="password">Confirm Password:</label>
                        <input type="password" name="confirmpassword" placeholder={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} required/>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;