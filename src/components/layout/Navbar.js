import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userlogout } from '../../redux/actions/userActions';
import { Confirm, Icon } from 'semantic-ui-react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { logoutmodalopen: false };
    this.logOut = this.logOut.bind(this);

  }

  logOut() {
    this.props.userlogout();
  }
  render() {
    const { loggedIn } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-5 mobilenav">
        <div className="">
          <Link className="navbar-brand" to="/">
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <Icon name="futbol outline" color="red"/>
                <Link className="nav-link" to="/">
            FutsalNepal
              </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About
              </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
              </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
              </Link>
              </li>
              <li className="nav-item">
                {loggedIn ? <span className="nav-link" style={{cursor:'pointer'}} onClick={() => this.setState({ logoutmodalopen: true })}>LogOut</span> : <Link className="nav-link" to="/Login">
                  Login
              </Link>}
              </li>
            </ul>
          </div>

        </div>
        <Confirm open={this.state.logoutmodalopen}
        basic
        size="mini"
       header='Are you sure you want to log out?'
       content=''
        onCancel={() => this.setState({ logoutmodalopen: false })}
         onConfirm={() => { this.setState({ logoutmodalopen: false }); this.logOut() }} />
      </nav>
     
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {

    userlogout: bindActionCreators(userlogout, dispatch),

  };
};

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
