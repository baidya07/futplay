import React, { Component } from 'react';
import { Card, Icon, Image, Container, Header, Loader, Message,Button,Rating } from 'semantic-ui-react';
import { getAllGrounds } from '../redux/actions/futsalGround';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class FutsalGround extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllGrounds();
  }

  render() {
    const { data, error, loading } = this.props;
    console.log(data, error, loading);
    return (
      <div className="">
      <Header as="h1"color="grey" textAlign="center">Grounds Near You!</Header>
        <Container fluid>
          {loading && <Loader />}
          {error && <Message negative>{error}</Message>}
          <Card.Group doubling stackable centered itemsPerRow={3}>
            {data &&
              data.map(ground => {
                return (
                  <Card key={ground._id}>
                    <Image src={require('../images/ball-field-football-47730.jpg')} />
                    <Card.Content>
                      <Card.Header>{ground.name}</Card.Header>
                      <Card.Meta>
                        <span >{ground.address}</span>
                      </Card.Meta>
                      <Card.Description>
                        <Header as="h2">
                          <Icon name="phone" />{ground.phone}
                        </Header>
                        <Header as="h2">
                          <Icon name="mail" />{ground.email}
                        </Header>
                        <Rating icon='star' defaultRating={3} maxRating={4} />
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Link to={`/booking/${ground._id}`}>
                        <Button color="blue">Book Now!</Button>
                      </Link>
                    </Card.Content>
                  </Card>
                );
              })}
          </Card.Group>
      <Header as="h3"color="grey" textAlign="center">Hurry and book your favourite Futsal Ground.</Header>

          <br/><br/>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login,
  data: state.ground.list,
  error: state.ground.error,
  loading: state.ground.loading
});

const mapDispatchToProps = dispatch => ({
  getAllGrounds: bindActionCreators(getAllGrounds, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FutsalGround);
