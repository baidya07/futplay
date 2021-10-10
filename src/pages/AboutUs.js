import React,{Component} from 'react';
import {Grid, Container, Form, Button, Header, Image} from 'semantic-ui-react';

class AboutUs extends Component{
  render(){
    return(
      <div className="aboutus-main-container">
        <Container>
          <Grid>
            <Grid.Column textAlign="justified" mobile={16} computer={8}>
              <Header as="h1" color="grey">
                About Futplay Nepal
              </Header>
                <p className="thin p-font">
                Welcome to Futplay. We are a growing global community of futsal enthuiast who are ambitious to make
                booking courts and slots as painless as possible. We are also committed to making communication between
                members and futsal courts simple and straightforward.
                <br/>
                <br/> 
                The Futplay booking platform is a powerful booking
                system that lets courts Administrators manage all aspects of their court's facilities and bookings whilst
                making it really easy for members to book time slots. We would be delighted to have your players join our
                global community.
                </p>
                <Header as="h1" color="grey">
                Try Our Paid Version for more Features
                </Header>
                <p>
                Why not try our fully functioning, free (no credit card needed) 60 day trial to see what
                you think. We're here for you, your courts and your members.{' '}
                </p>
              <Button color="grey">Click Here</Button>
              </Grid.Column>
                <Grid.Column textAlign="justified" mobile={10} computer={8}>
                  <br/>
                  <br/>
                  <Image src={require('../images/action-athlete-cleats-774321.jpg')} size='large' rounded />
                  <br/>
              </Grid.Column>
          </Grid>
        </Container>
        <br/>
        <br/>
      </div>
    )
  }
}

export default AboutUs;