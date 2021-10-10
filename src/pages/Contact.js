import React, {Component} from 'react'
import {Grid, Container, Form, Button, Header,TextArea} from 'semantic-ui-react';

class ContactUs extends Component{
  render(){
    return(
      <div classNames="contactus-main-container">
        <Container>
          <Grid>
            <Grid.Column mobile={16} computer={9}>
            <Header as="h1" color="grey">
              Get in Touch
            </Header>
            <p>Please fill up the form and we will be in touch with lighting speed.</p>
              <Form>
              <Form.Field>
                  <label>First Name</label>
                  <input placeholder='Enter your First Name' />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Enter your Last Name' />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input placeholder='Enter your Email Address' />
                </Form.Field>
                <label>Message</label>
                <Form>
                  <TextArea placeholder='Tell us more' />
                </Form>
                <br/>
                <Button color="green" type='submit'>Submit</Button>
              </Form>
            </Grid.Column>
          
          
            <Grid.Column textAlign="right" mobile={16} computer={6}>
            <Header as="h2" color="grey">
              Connect with us:
            </Header>
            <span>For support or any questions:<br/>
            Email us at <a href="#">support@futplaynepal</a></span>
            <br/>
            <br/>
            <Header as="h2" color="grey">
              Kathmandu Nepal
            </Header>
            <p>Baneswor,44600<br/>
            Kathmandu,Nepal</p>
            </Grid.Column>
          </Grid>
        </Container>
        <br/>
      </div>
      
    )
  }
}
export default ContactUs;
