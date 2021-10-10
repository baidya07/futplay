import React, { Component } from 'react';
import { Grid, Loader, Message, Card, Image, Icon, Header, Table, Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userProfileAction from '../redux/actions/userProfileAction';
import { getUserBookings, deleteBooking } from '../redux/actions/booking';
import moment from 'moment';
import axios from 'axios';
import { push } from 'react-router-redux';
// var Loader = require('react-loader');

const Tim = {
  '1': '7 am - 9 am',
  '2': '9 am - 11am',
  '3': '11 am - 1 pm',
  '5': ' 3 pm - 5pm',
  '6': '5 pm - 7pm',
  '4': '1 pm - 3 pm'
};

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendInviteModalOpen: false,
      userListModal: false,
      user: [],
      invitedList: [],
      current:{user:{},booking:{},index:''}

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    this.props.profileActions.getUserProfile(this.props.Username);
    if (this.props.data._id) {
      this.props.getUserBookings(this.props.data._id);
    }
    axios.get('http://localhost:3000/api/user')
      .then(res => {
        if (res.data) {
          // const d=[];
          this.setState({ user: res.data });
        }
      })
  }

  handleSubmit() {
    // const invitation = {

    // }
    const userId = this.state.current.user._id;
    const booking= this.state.current.booking;
    const index = this.state.current.index;
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/invite',
      data: {
        senderId: this.props.data._id,
        senderName: this.props.data.Firstname +' '+ this.props.data.Lastname,
        recieverId: userId,
        groundname: this.props.idvalues[booking.groundId].name,
        date: booking.date.replace(/d/g, '-'),
        slots: Tim[booking.slots]
      }
    })
      .then(res => {
        console.log(res)
        if (res.data) {
          console.log("Invitation sent");
          console.log(this.props);
          let { invitedList } = this.state;
          invitedList.push(index);
          this.setState({ invitedList: invitedList, sendInviteModalOpen: false });
        }
        else {
          console.log('error')
        }
      })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.Username !== null && newProps.Username !== this.props.Username) {
      this.props.profileActions.getUserProfile(newProps.Username);
    }
    if (newProps.Username && !newProps.userloaded && newProps.userloaded != this.props.userloaded) {
      // this.props.profileActions.getUserProfile(newProps.Username);
    }
    if (newProps.userloaded !== this.props.userloaded && newProps.userloaded) {
      this.props.getUserBookings(newProps.data._id);
    }
  }

  render() {
    const { user, loading, data, error, bookerror, bookinglist, bookloading, idvalues } = this.props;
    console.log(this.state.invitedList)
    return (
      <Grid padded>
        <Grid.Column mobile={16} computer={4}>
          {loading && <Loader />}
          {!loading && (
            <Card fluid>
              <Image src={require('../images/playeravatar.jpg')} />
              <Card.Content>
                <Card.Header>
                  <span>
                    {' '}
                    Name: {data.Firstname} {data.Lastname}
                  </span>
                  <span style={{ marginRight: '30px' }} />
                  <span>
                    <Icon name="user" />
                    {data.Username}
                  </span>
                </Card.Header>
                <Card.Meta>
                  <br />
                  <span className="date">
                    <Icon name="mail" /> {data.Email}
                  </span>
                  <span style={{ marginRight: '30px' }} />
                  <span>
                    <Icon name="phone" />
                    {data.Phonenumber}.
                  </span>
                  <br />
                </Card.Meta>
              </Card.Content>
              <Card.Content extra />
            </Card>
          )}
          {error && <Message negative></Message>}
        </Grid.Column>
        <Grid.Column mobile={16} computer={10}>
          <Header as="h1" color="grey">
            My Bookings
          </Header>

          {bookloading && <Loader />}
          <div style={{ height: '60vh', overflowY: 'scroll' }}>
            <Table celled stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Futsal Ground Name</Table.HeaderCell>
                  <Table.HeaderCell>Date of Booking</Table.HeaderCell>
                  <Table.HeaderCell>Contact of Futsal Ground</Table.HeaderCell>
                  <Table.HeaderCell>Time</Table.HeaderCell>
                  <Table.HeaderCell>Cancel Reservation</Table.HeaderCell>
                  <Table.HeaderCell>Invite Players</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {bookinglist &&
                  bookinglist.map(booking => {
                    return (
                      <Table.Row key={booking._id}>
                        <Table.Cell>{idvalues[booking.groundId].name}</Table.Cell>
                        <Table.Cell>{booking.date.replace(/d/g, '-')}</Table.Cell>
                        <Table.Cell>{idvalues[booking.groundId].phone}</Table.Cell>
                        <Table.Cell>{Tim[booking.slots]}</Table.Cell>
                        <Table.Cell>
                          <Button
                            floated="right"
                            color="yellow"
                            disabled={moment().format('DD-MM-YYYY') > moment(booking.date.replace(/d/g, '-'))}
                            onClick={() => {
                              this.props.deleteBooking(booking._id, data._id);
                            }}
                          >
                            UnReserve
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <Button color="green" onClick={() => this.setState({ userListModal: true,invitedList:[] })}>Invite Players</Button>
                          <Modal className="modal-position" open={this.state.userListModal} onClose={() => this.setState({ userListModal: false })}>
                            <Modal.Header>Send Invitation</Modal.Header>
                            <Modal.Content>
                              <div style={{ height: '70vh', overflowY: 'scroll' }}>
                                <Table celled stackable>
                                  <Table.Header>
                                    <Table.Row>
                                      <Table.HeaderCell>Name</Table.HeaderCell>
                                      <Table.HeaderCell>Email</Table.HeaderCell>
                                      <Table.HeaderCell>Contact Number</Table.HeaderCell>
                                      <Table.HeaderCell>Send Invites</Table.HeaderCell>
                                    </Table.Row>
                                  </Table.Header>

                                  <Table.Body>
                                    {this.state.user.length > 0 &&
                                      this.state.user.map((user, idx) => {
                                        return (
                                          <Table.Row key={user._id}>
                                            <Table.Cell>{user.Firstname} {user.Lastname}</Table.Cell>
                                            <Table.Cell>{user.Email}</Table.Cell>
                                            <Table.Cell>{user.Phonenumber}</Table.Cell>
                                            <Table.Cell>
                                              {this.state.invitedList.indexOf(idx) == -1 && <Button color="green" icon="send" onClick={() => this.setState({ current: { user: user, booking: booking, index: idx }, sendInviteModalOpen: true })} />
                                              }
                                              {this.state.invitedList.indexOf(idx) > -1 && <Icon name="check" color="green" disabled />}
                                            </Table.Cell>
                                          </Table.Row>
                                        );
                                      })}
                                  </Table.Body>
                                </Table>
                              </div>
                            </Modal.Content>
                          </Modal>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          </div>
          {error && <Message negative>{bookerror}</Message>}
          <Modal className="modal-position" open={this.state.sendInviteModalOpen}>
            <Modal.Header>
              Send Invites
                                                  </Modal.Header>
            {this.state.current.user._id && this.state.current.booking._id &&<Modal.Content>
              Send Invite to {this.state.current.user.Firstname} {this.state.current.user.Lastname} for a match at {idvalues[this.state.current.booking.groundId].name} on {this.state.current.booking.date.replace(/d/g, '-')} from {Tim[this.state.current.booking.slots]}.
                                                  </Modal.Content>}
            <Modal.Actions>
              <Button type="submit" onClick={() => this.handleSubmit()} color="green">Send</Button>
              <Button color="red" onClick={() => { this.setState({ sendInviteModalOpen: false }) }}>Cancel</Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.userprofile.loading,
  error: state.userprofile.error,
  data: state.userprofile.data,
  Username: state.login.Username,
  bookinglist: state.booking.list,
  bookloading: state.booking.loading,
  bookerror: state.booking.error,
  idvalues: state.ground.ids,
  userloaded: state.userprofile.loaded
});

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(userProfileAction, dispatch),
  getUserBookings: bindActionCreators(getUserBookings, dispatch),
  deleteBooking: bindActionCreators(deleteBooking, dispatch),
  push: bindActionCreators(push, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard);
