import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Header, Segment, Button, Icon, Dimmer, Loader, Message, Label, Card } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getFilteredBookings, getAvailability } from '../redux/actions/booking';
import axios from 'axios';
import { push } from 'react-router-redux';

const square = { width: 175, height: 175, cursor: 'pointer' };
const Tim = {
  '1': '7 am - 9 am',
  '2': '9 am - 11am',
  '3': '11 am - 1 pm',
  '5': ' 3 pm - 5pm',
  '6': '5 pm - 7pm',
  '4': '1 pm - 3 pm'
};
class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = { date: moment(), isOpen: false, loading: false, bookmodal: false, error: '', t: '' };
    this.handleChange = this.handleChange.bind(this);
    this.getAvailability = this.getAvailability.bind(this);
    this.bookGround = this.bookGround.bind(this);
  }

  handleSmsSubmit(){
    const booking = this.state.current.booking;

    axios({
      method: 'post',
      url:'http//localhost:3000/api/sms',
      data: {
        Username: this.props.user.Username,
        groundname: this.props.idvalues[booking.groundId].name,
        date: booking.date.replace(/d/g, '-'),
        slots: Tim[booking.slots]
      }
      .then(res=>{
        console.log(res);
        console.log(res.data);
      })    
  })
}

  handleChange(date) {
    this.setState({
      date: date,
      isOpen: false
    });

    this.getAvailability(date);
  }

  getAvailability(date) {
    const groundId = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);
    const dat = date.format('DD-MM-YYYY').replace(/-/g,'d');
    this.props.getAvailability(groundId,dat );
  }
  componentDidMount() {
    this.getAvailability(this.state.date);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.getAvailability(this.state.date);
    }
  }

  bookGround(timeframe) {
    this.setState({ loading: true, error: '', t: timeframe });
    const book = { userId: '',Username:'', date: '', slots: '' };
    book.slots = Number(timeframe);
    book.userId = this.props.user._id;
    book.Username = this.props.user.Username;
    const dat = this.state.date.format('DD-MM-YYYY').replace(/-/g,'d');
    book.date = dat;

    const groundId = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);
    console.log(groundId, book);
    const that = this;
    axios({ method: 'post', url: `http://localhost:3000/api/booking/${groundId}`, data: book })
      .then((response) => {
        console.log('done');
        that.setState({ bookmodal: true, loading: false });
      })
      .catch(err => that.setState({ loading: false, error: err.message }));
  }

  render() {
    console.log(this.props);
    const curr = new Date();
    const currenthour = curr.getHours();
    const currday = moment();
    console.log(currenthour);
    console.log('checcck', ...{ a: 2 }, {});
    const { booking } = this.props;
    const groundId = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);

    return (
      <div>
        {this.state.error && <Message negative>{this.state.error}</Message>}
        <Dimmer active={this.state.loading}>
          <Loader />
        </Dimmer>
        <Dimmer active={this.state.bookmodal}>
          <Card.Group>
            <Card raised className="modalcard">
              <Icon
                color="red"
                inverted
                size="medium"
                name="cancel"
                onClick={() => {
                  this.setState({ bookmodal: false });
                  this.getAvailability(this.state.date);
                }}
              />

              <Card.Content>
                <br />
                <br />
                <br />
                <Header as="h2" color="teal">
                  CONGRATULATIONS!!
                </Header>
                <br />

                <Header as="h3">
                  Your booking at {this.props.grounds[groundId] && this.props.grounds[groundId].name} is at {' '}
                  {this.state.date.format('DD-MM-YYYY')} between {Tim[this.state.t]}. Make sure you reach there in time!
                </Header>
                <br />
                <Button
                  onClick={()=>{
                    this.setState({ bookmodal: false });
                    this.handleSmsSubmit();
                    this.props.push('/dashboard');
                  }}
                  color="green"
                >
                  Oh Yeah!
                </Button>
              </Card.Content>
            </Card>
          </Card.Group>
        </Dimmer>
        <Header as="h1" textAlign="center">
          Book Your Game Time
        </Header>
        <br />
        <br />
        <Grid centered padded stackable columns={4}>
          <Grid.Column>
            <Header as="h2">Change Date</Header>
            <Segment circular color="green" raised style={square} onClick={() => this.setState({ isOpen: true })}>
              <Header as="h2">
                <br />
                <Header.Subheader>
                  <Icon name="calendar" size="big" />
                </Header.Subheader>
              </Header>
              <h3> {this.state.date.format('DD-MM-YYYY')}</h3>
            </Segment>

            {this.state.isOpen && (
              <DatePicker
                inline
                withPortal
                selected={this.state.date}
                onChange={this.handleChange}
                minDate={moment()}
                maxDate={moment().add(2, 'weeks')}
              />
            )}
          </Grid.Column>
          <Grid.Column>
            <Header as="h2">Available On</Header>
            <Button
              size="large"
              color={booking['1'] ? 'red' : 'green'}
              disabled={
                (currday.format('DD-MM-YYYY') == this.state.date.format('DD-MM-YYYY') && currenthour > 7) ||
                booking['1']
              }
              onClick={() => this.bookGround('1')}
            >
              7 am - 9 am
            </Button>
            <Button
              size="large"
              color={booking['2'] ? 'red' : 'green'}
              disabled={
                (currday.format('DD-MM-YYYY') == this.state.date.format('DD-MM-YYYY') && currenthour > 9) ||
                booking['2']
              }
              onClick={() => this.bookGround('2')}
            >
              9 am - 11am
            </Button>
            <br />
            <br />
            <br />
            <Button
              size="large"
              color={booking['3'] ? 'red' : 'green'}
              disabled={
                (currday.format('DD-MM-YYYY') == this.state.date.format('DD-MM-YYYY') && currenthour > 11) ||
                booking['3']
              }
              onClick={() => this.bookGround('3')}
            >
              11 am - 1 pm
            </Button>
            <Button
              size="large"
              color={booking['4'] ? 'red' : 'green'}
              disabled={
                (currday.format('DD-MM-YYYY') == this.state.date.format('DD-MM-YYYY') && currenthour > 13) ||
                booking['4']
              }
              onClick={() => this.bookGround('4')}
            >
              1 pm - 3 pm
            </Button>
            <br />
            <br />
            <br />
            <Button
              size="large"
              color={booking['5'] ? 'red' : 'green'}
              disabled={
                (currday.format('DD-MM-YYYY') == this.state.date.format('DD-MM-YYYY') && currenthour > 15) ||
                booking['5']
              }
              onClick={() => this.bookGround('5')}
            >
              3 pm - 5pm
            </Button>
            <Button
              size="large"
              color={booking['6'] ? 'red' : 'green'}
              disabled={
                (currday.format('DD-MM-YYYY') == this.state.date.format('DD-MM-YYYY') && currenthour > 17) ||
                booking['6']
              }
              onClick={() => this.bookGround('6')}
            >
              5 pm - 7pm
            </Button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br /> <br />
            <br />
            <br />
            <br />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getFilteredBookings: bindActionCreators(getFilteredBookings, dispatch),
    getAvailability: bindActionCreators(getAvailability, dispatch),
    push: bindActionCreators(push, dispatch)
  };
};

const mapStateToProps = state => ({
  location: state.router.location,
  booking: state.booking.currentBooking,
  user: state.userprofile.data,
  grounds: state.ground.ids
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookPage);
