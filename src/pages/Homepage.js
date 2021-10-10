import React, { Component } from 'react';
import { Container, Divider, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
  render() {
    return (
      <div className="homepage-main-container">
        <div style={{ zIndex: '1000' }}>
          <video autoPlay muted loop id="myVideo">
            <source src={require('../images/vid.mp4')} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          <div className="fixcontent thin">
            <Container textAlign="justified" >
              {/* <Divider /> */}
              <div className="">
              <h1 className="h1-font">WELCOME TO FUTPLAY</h1>
              <Divider />

              <h2 className="h2-font">OUR POWERFUL FUTSAL BOOKING SYSTEM HELPS YOU PLAY MORE</h2>
              <p className="thin p-font">
                Welcome to Futplay. We are a growing global community of futsal enthuiast who are ambitious to make
                booking courts and slots as painless as possible. We are also committed to making communication between
                members and futsal courts simple and straightforward. The Futplay booking platform is a powerful booking
                system that lets courts Administrators manage all aspects of their court's facilities and bookings whilst
                making it really easy for members to book time slots. We would be delighted to have your players join our
                global community. Why not try our fully functioning, free (no credit card needed) 60 day trial to see what
                you think. We're here for you, your courts and your members.{' '}
              </p>
              <div style={{ position: 'fixed', width: '100%', height: ' 100%' }} />
              </div>
            </Container>
            <Container textAlign="center">
            
            <div className="explore-ground-container">
              <Link to="/futsalgrounds">
                <Button color="black" basic inverted size="massive" icon labelPosition="right">
                  Explore Grounds
                  <Icon name="right chevron" />
                </Button>
              </Link>
              </div>
            </Container>
            <br />
            <br />
            <br />
          </div>
          <div className="desktoponly"/>
        </div>
      </div>
    );
  }
}

export default Homepage;
