import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
const LoginForm = props => {
  const { handleSubmit, loggingIn, err } = props;
  return (
    <div className="login-form">
      {err && (<Message negative>
        <Message.Header>Error occured</Message.Header>
       {err.message}
      </Message>
      )}
      <Grid textAlign="center" style={{ height: "auto" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="black" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Field
                fluid
                icon="user"
                name="Username"
                component={Form.Input}
                iconPosition="left"
                placeholder="User Name"
                required
              />
              <Field
                fluid
                icon="lock"
                iconPosition="left"
                component={Form.Input}
                name="Password"
                placeholder="Password"
                type="password"
                required
              />
              <Button type='submit' color="black" fluid loading={loggingIn} disabled={loggingIn} size="large">
                Login
                </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/register">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};
export default reduxForm({
  form: "login" // a unique identifier for this form
})(LoginForm);