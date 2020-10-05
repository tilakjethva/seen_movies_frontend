
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import {Link, useHistory} from "react-router-dom";

class Login extends React.Component {

    state = {
      user_name: "",
      password: "",
    }
      componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
      }
    
    //  API to save your review
    loginSubmit = (event) => {
        console.log( this.state);
        const { history } = this.props;

        // fetch("https://cors-anywhere.herokuapp.com/http://localhost:8080/auth/realms/movie-oidc/protocol/openid-connect/token", {
        //   method: 'POST',
        //     body: {"client_id":"movie-application",
        //       "grant_type":"password",
        //       "username":"test",
        //       "password":"test"},
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        // })
        // .then(function(response){ console.log(response.json()); })

        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(function(response){ return response.json(); })
        .then(function(data) {
          const items = data;
          
          if (items.length > 0) {
            history.push('/movie-list');
            console.log(items[0])
            localStorage.setItem('user', items[0].user_id);
          }
        })
        event.preventDefault();
    }

    handleEmailChange = event =>{
        this.setState({  user_name: event.target.value  });
    }
    handlePasswordChange = event =>{ 
        this.setState({  password: event.target.value  });
    }

  render() {
    return (
      <>
        <main ref="main" className="login">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <h1>sign in </h1>
                      </div>
                        <Form onSubmit={this.loginSubmit}>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="User Name"
                                type="text"
                                name="email"
                                onChange={this.handleEmailChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              name="password"
                              onChange={this.handlePasswordChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <Link
                          to="register-page"
                          className="text-light"
                      >
                        <small>Create new account</small>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Login;
