import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from './LoginForm';
import * as userActions from '../../redux/actions/userActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillUnmount() {
    this.props.userActions.resetError();
  }
  handleSubmit() {
    console.log(' gelo');
    const params = this.props.data.values;
    console.log(params);
    this.props.userActions.userLogin(params);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.login.loggedIn) {
      this.props.history.push('/');
    }
  }
  render() {
    const { login } = this.props;
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <LoginForm loggingIn={login.logging} err={login.error} handleSubmit={this.handleSubmit} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login,
  data: state.form.login
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
