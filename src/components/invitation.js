import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Popup, Segment,Header,Message, Label,Card, Icon } from 'semantic-ui-react';
import {getInvitations} from '../redux/actions/invitation';

const square = { width: 50, height: 50 }

class Invitation extends Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    componentDidMount() {
        if(this.props.userprofile._id) {
            this.props.getInvitations(this.props.userprofile._id);
        }
    }
    componentWillReceiveProps(newProps) {
        if(newProps.userprofile._id && newProps.userprofile._id!= this.props.userprofile._id) {
            this.props.getInvitations(newProps.userprofile._id);
            
        }
    }
    render() {
        return (
        <div className="invitation-component">
        <div className="invitation-button">
        {!this.props.loggedIn && 
        <Popup trigger={<Icon name="question" size="huge" color="grey"/>} content='Oops, youre not logged in !' />}
        {!this.state.modalOpen && this.props.loggedIn &&
        <span  onClick={() => this.toggleModal()}>
        <Icon name='mail' color="grey" size="big"/>
        <Label color="red" floating >{this.props.invitation.length}</Label>
      </span>}
      {this.state.modalOpen && <Icon name="close" color="red" size="big" onClick={() => this.toggleModal()}/>}
            {/* <Segment circular style={square} >
                {!this.state.modalOpen && 
                     <Label color="red">{this.props.invitation.length}</Label>
                }
               <span className="invitation-button"> {this.state.modalOpen && <Icon name='mail' color="teal" size='huge' />}
               </span>
                
            </Segment> */}
            </div>
            {this.state.modalOpen && <div className="invitation-content">
            {this.props.loggedIn &&  <div className="invite-msg-container">
                {this.props.invitation.length > 0 &&
                     this.props.invitation.map(invite =>{
                         return <Message color="twitter" size="mini" compact key={invite._id}>
                {invite.senderName} has invited you to play at {invite.groundname} from {invite.slots} on {invite.date.replace(/d/g, '-')}</Message>})}
</div>}
            </div>}
        </div>
        )

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getInvitations: bindActionCreators(getInvitations, dispatch),

    };
};
const mapStateToProps = state => ({
    invitation: state.invites.invitation,
    userprofile: state.userprofile.data,
    loggedIn : state.login.loggedIn
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invitation);