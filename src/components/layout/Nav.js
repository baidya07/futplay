import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userlogout } from '../../redux/actions/userActions';
import { Button, Label, Confirm, Image, Icon, Menu, Dropdown, Container, DropdownItem } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import { getUserProfile } from '../../redux/actions/userProfileAction';
import { getInvitations } from '../../redux/actions/invitation';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { logoutmodalopen: false };
    this.logOut = this.logOut.bind(this);

  }

  componentWillReceiveProps(newProps) {
    if (newProps.Username && newProps.Username != this.props.Username) {
      this.props.getUserProfile(newProps.Username);
    }
  }

  logOut() {
    this.props.userlogout();
  }
  render() {
    const { loggedIn } = this.props;
    return (<div className="desktopnav">
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item href="/" header className="logoimage">
            <Image src={require('./../../images/ball.png')} size="mini" />
            Futplay Nepal
        </Menu.Item>
          <Menu.Item href="/aboutus">About</Menu.Item>
          <Menu.Item href="/contact">Contact</Menu.Item>
          <Menu.Item href="/dashboard">Dashboard</Menu.Item>
          <Dropdown item icon='power'>
            <Dropdown.Menu>

              {!loggedIn && <Dropdown.Item onClick={() => this.props.push('/login')}><Icon name="sign in" />Log In</Dropdown.Item>}
              {loggedIn && <Dropdown.Item onClick={() => this.setState({ logoutmodalopen: true })}><Icon name="sign out" />Log Out</Dropdown.Item>}

            </Dropdown.Menu>
          </Dropdown>
        

        </Container>
      </Menu>
      <Confirm open={this.state.logoutmodalopen}

        size="mini"
        header='Leaving ?'
        content='Are you sure you want to log out?'
        onCancel={() => this.setState({ logoutmodalopen: false })}
        onConfirm={() => { this.setState({ logoutmodalopen: false }); this.logOut() }} />
    </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {

    userlogout: bindActionCreators(userlogout, dispatch),
    push: bindActionCreators(push, dispatch),
    getUserProfile: bindActionCreators(getUserProfile, dispatch),
    getInvites: bindActionCreators(getInvitations, dispatch)

  };
};
const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  myInvites: state.invites.invitation,
  Username: state.login.Username,
  profile: state.userprofile
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);