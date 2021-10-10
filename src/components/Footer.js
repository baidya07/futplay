import React from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Services" />
                <List link inverted>
                  <List.Item content={<a href="/">Futsal Bookings</a>} />
                  <List.Item content={<a href="/futsalgrounds">Discover Grounds</a>} />
                  <List.Item content={<a href="/dashboard">User Booking Dashboard</a>} />
                  <List.Item content={<a href="/notfound">Advertisement(Coming Soon)</a>} />
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Follow us on" />
                <List link inverted>
                  <List.Item icon="facebook" content={<a href="http://www.facebook.com">Facebook</a>} />
                  <List.Item icon="twitter" content={<a href="http://www.twitter.com">Twitter</a>} />
                  <List.Item icon="instagram" content={<a href="http://www.instagram.com">Instagram</a>} />
                  <List.Item icon="youtube" content={<a href="http://www.youtube.com">YouTube</a>} />
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Looking for advertisement?
                </Header>
                <p>We will be giving advertisement options as soon as possible. Please keep in touch!</p>
              </Grid.Column>
            </Grid.Row>
            <br />
            <br />
            <Header as="h4" style={{ width: '100%' }} inverted textAlign="center">
              © All Rights Reserved. FutplayNepal
            </Header>
          </Grid>
        </Container>
      </Segment>
    </div>
    );
  }
}
export default Footer;
