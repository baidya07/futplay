import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
//Components
import Navbar from './components/layout/Navbar';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/auth/LoginContainer';
import App1 from './components/auth/app';
import Bookingpage from './pages/Bookingpage';
import FutsalGround from './pages/FutsalGrounds';
import UserDashboard from './pages/UserDashboard';
import RegisterForm from './components/auth/RegisterForm';
import ContactUs from './pages/Contact';

//Styles
import './style/default.scss';
import './style/index.css';
import store, { history } from './redux/store';
import { ConnectedRouter } from 'react-router-redux';
import LoginChecker from './LoginChecker';
import Nav from './components/layout/Nav';
import NotFound from './NotFound';
import BookPage from './pages/BookPage';
import { Container } from 'semantic-ui-react';
import Invitation from './components/invitation';


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>

            <div className=" ">
              {/* <Header /> */}
              <Navbar />
              <Nav />
              <div className="home-grad">
                <Invitation />

                <Container>
                  <br />
                  <br />
                  <br />
                  <br />
                </Container>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <LoginChecker {...this.props}>
                        <Homepage {...this.props} />
                      </LoginChecker>
                    )}
                  />
                  <Route
                    exact
                    path="/aboutus"
                    render={() => (
                      <LoginChecker {...this.props}>
                        <AboutUs {...this.props} />
                      </LoginChecker>
                    )}
                  />
                  <Route exact path="/login"  render={() => (
                      <LoginChecker>
                        <Login {...this.props} />
                      </LoginChecker>
                    )}/>
                  <Route
                    exact
                    path="/contact"
                    render={() => (
                      <LoginChecker>
                        <ContactUs {...this.props} />
                      </LoginChecker>
                    )}
                  />
                  <Route
                    exact
                    path="/test"
                    render={() => (
                      <LoginChecker>
                        <App1 {...this.props} />
                      </LoginChecker>
                    )}
                  />
                  <Route
                    exact
                    path="/bookingpage"
                    render={() => (
                      <LoginChecker>
                        <Bookingpage {...this.props} />
                      </LoginChecker>
                    )}
                  />
                  <Route
                    exact
                    path="/futsalgrounds"
                    render={() => (
                      <LoginChecker>
                        <FutsalGround {...this.props} />
                      </LoginChecker>
                    )}
                  />
                  <Route
                    exact
                    path="/dashboard"
                    render={() => (
                      <LoginChecker>
                        <UserDashboard {...this.props} />
                      </LoginChecker>
                    )}
                  />
                  <Route
                    exact
                    path="/booking/:groundId"
                    render={() => (
                      <LoginChecker>
                        <BookPage {...this.props} />
                      </LoginChecker>
                    )}
                  />
                  <Route
                    exact
                    path="/register" component={RegisterForm}
                   
                  />
                  <Route path="*"
                    render={() => <LoginChecker><NotFound />
                    </LoginChecker>} />
                </Switch>
              </div>
              <Footer />
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}
export default App;

// import * as actionCreator from './';
