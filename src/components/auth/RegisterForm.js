import React, {Component} from 'react';
import { Button, Form, Checkbox, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import axios from 'axios'
import store from '../../redux/store/index';
import {push} from 'react-router-redux';
class RegisterForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            Firstname: "",
            FirstnameError:"",
            Lastname:"",
            LastnameError:"",
            Email:"",
            EmailError:"",
            Phonenumber:"",
            PhonenumberError:"",
            Username:"",
            UsernameError:"",
            Password: "",
            ConfirmPassword:""
            
        }
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this)
        this.handleChangeLastname = this.handleChangeLastname.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePhonenumber = this.handleChangePhonenumber.bind(this)
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeFirstname(event){
        this.setState({Firstname:event.target.value})
    }
    handleChangeLastname(event){
        this.setState({Lastname:event.target.value})
    }
    handleChangeEmail(event){
        this.setState({Email:event.target.value})
    }
    handleChangePhonenumber(event){
        this.setState({Phonenumber:event.target.value})
    }
    handleChangePassword(event){
        this.setState({Password:event.target.value})
    }
    handleConfirmPassword(event){
        this.setState({ConfirmPassword:event.target.value})
    }
    handleChangeUsername(event){
        this.setState({Username:event.target.value})
    }

    handleSubmit(event){  
        event.preventDefault();
        const users = {
            Firstname: this.state.Firstname,
            Lastname: this.state.Lastname,
            Email: this.state.Email,
            Phonenumber: this.state.Phonenumber,
            Username: this.state.Username,
            Password: this.state.Password,
        }

        const{ Password, ConfirmPassword}=this.state;
        if(Password!==ConfirmPassword){
            alert("Password don't match!!!")
        }
        else{
    
           axios({
               method:'post',
               url:'http://localhost:3000/api/user',
               data:{users}
           })
           .then(response =>{
               console.log(response)
               if(response.data){
                   console.log('Successfully Registered');
                  store.dispatch(push('/login'))
               }
                else{
                   console.log('sign-up error')
               }
           })
        }
    }
    render(){
    // const { handleSubmit, err } = props;
    return(
        <div className="login-form">
        {/* {err && (<Message negative>
            <Message.Header>Error occured</Message.Header>
            {err.message}
        </Message>
        )} */}
        <Grid textAlign="center" style={{ height: "auto" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
                Sign-Up for Futplay
            </Header>
            <Form size="large" >
                <Segment stacked>
                <Form.Input 
                    fluid
                  
                    name="Firstname"
                    
                    iconPosition="left"
                    placeholder="First Name"
                    onChange={this.handleChangeFirstname}
                    required
                />
                <Form.Input
                    fluid
                   
                    name="Lastname"
                    
                    iconPosition="left"
                    placeholder="Last Name"
                    onChange={this.handleChangeLastname}
                    required
                />
                <Form.Input
                    fluid
                    icon="user"
                    name="Username"
                    
                    iconPosition="left"
                    placeholder="User Name"
                    onChange={this.handleChangeUsername}
                    required
                />
                <Form.Input
                    fluid
                    icon="mail"
                    name="Email"
                    
                    iconPosition="left"
                    placeholder="Email"
                    type="email"
                    onChange={this.handleChangeEmail}
                    required
                />
                <Form.Input
                    fluid
                    icon="phone"
                    iconPosition="left"
                    
                    name="Phonenumber"
                    placeholder="Phone Number"
                    type="number"
                    onChange={this.handleChangePhonenumber}
                    required
                />
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    
                    name="Password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChangePassword}
                    required
                />
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    
                    name="Password"
                    placeholder="Confirm Password"
                    type="password"
                    onChange={this.handleConfirmPassword}
                    required
                />
                <Form.Field control={Checkbox} label={{ children: 'I agree to the Terms and Conditions' }} />
                <Button type='submit' onClick ={this.handleSubmit} color="black">
                    Sign-Up
                    </Button>
                </Segment>
            </Form>
            <Message>
                Already Registered <a href="/login">LogIn</a>
            </Message>
            </Grid.Column>
        </Grid>
        </div> 
        )
    }
}

    
export default RegisterForm;