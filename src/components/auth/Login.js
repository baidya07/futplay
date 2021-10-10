import React from 'react';
import passport from 'passport-local';
import axios from 'axios'
import {Alert,Button,FormGroup, controlId, Label,FormControl,HelpBlock,ControlLabel} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import Register from './Register';


class Login extends React.Component{
    constructor(props){
        super(props);
        
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            Username:'', 
            Password:''
        }
    }

    getValidationState(){
        const length = this.state.Username.length;
        if(length > 6) return 'success';
        else if(length > 5) return 'warning';
        else if(length > 0) return 'error';
        return null;
    }
    
    handleUsernameChange(e){
        this.setState({Username:e.target.value});
    }
    handlePasswordChange(e){
        this.setState({Password:e.target.value})
    }

    
    onSubmit(e){
        e.preventDefault();
        
        const {history} = this.props
          axios({
              method: 'post',
              url: 'http://localhost:3000/api/login',
              data: {
                  Username: this.state.Username,
                  Password: this.state.Password
              }
          })
          .then(response => {
              console.log(response)
              if(response.data){
                  console.log('Login succesfull');  
                if(response.data.success===true){
                    history.push('/bookingpage')
                }
            }
        })
    }

    render(){
        return(
            <div className="login-main-container">
                <div className="login-mid-container">
                    <div className="login-top-container">
                        <h1>Login</h1>
                    </div><br/>
                        <div className="login-input-container">
                            <form>
                                <FormGroup>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Enter Username"
                                        onChange={this.handleUsernameChange}
                                    />
                                    <FormControl.Feedback/>
                                    </FormGroup>
                                    <FormGroup>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={this.handlePasswordChange}
                                    />
                                    <FormControl.Feedback/>
                                </FormGroup>
                            </form>
                        </div>
                    <div className="login-bottom-container">
                        <div className="signin-button">
                            <Button onClick={this.onSubmit} bsStyle="success">Sign In</Button> 
                            <br/><br/>
                            <div className="register-link">
                                <Link to="/Register">Click here to register</Link>      
                            </div>
                        </div>
                        {/* <div className="signup-button">
                            <Button bsStyle="success">Register</Button> 
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login