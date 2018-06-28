import React, {Component} from "react";
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter 
} from "react-router-dom";
import {Redirect} from 'react-router';
import {connect} from "react-redux";
import { fetchLogin } from '../../../actions/auth-actions.jsx';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';

class Login extends Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.state = {
          email: '',
          password: '',
          formErrors: {email: '', password: ''},
          emailValid: false,
          passwordValid: false,
          formValid: false,
          login:false,
          sessionLoginToken:''
        };
    }

    setLogin() {
        if (loginToken != "") {
            this.setState({login: true})
            // console.log(this.state.login)
          }
      }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({value:e.target.value});
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
      }
    
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
    
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm(this));
      }

      handleSubmit(e){
        e.preventDefault();
        var username = document.querySelector('#emailUser').value;
        var password = document.querySelector('#passUser').value;
        var self = this;
        this.props.fetchLogin(username, password);
      }

      render() {
        const { from } = this.props.location.state || '/login'
        const { login } = this.state
        const toastStyle = {
          zIndex: 2000
        };
   
        const isAuthenticated = () => {
            if(this.props.isAuthenticated == true) {
                return <Redirect to="/dashboard" />
            }
            else {
                return null;
            }
        }
        return (
          <div className="app flex-row align-items-center"> {isAuthenticated()}
          <ToastContainer position="bottom-right" autoClose={7500} style={toastStyle}/>
            <Container>
              <Row className="justify-content-center">
                <Col md="8">
                  <CardGroup className="mb-0">
                    <Card className="p-4">
                      <CardBody className="card-body">
                      <form onSubmit={this.handleSubmit}>
                        <h1>Museum Adventure Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <div className="panel panel-default">
                        </div>
                        <InputGroup className="mb-3">
                          <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                          <Input type="email" id="emailUser" name="corp-email" placeholder="Username" />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                          <Input type="password" id="passUser" name="current-password" placeholder="Password" />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button type="submit" color="primary" className="px-4" disabled={this.props.inProgress}>Login</Button>
                          </Col>
                          {this.props.isAuthenticated && (
                            <Redirect to={from || '/dashboard'}/>)}
                        </Row>
                        </form>
                      </CardBody>
                    </Card>
                    <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                      <CardBody className="card-body text-center">
                        <div>
                          {/* <img src={'img/logo.png'} className="img-responsive text-center" style={{width:70+'%'}} alt="insightia-logo"/> */}
                          <br />
                          <h2>&nbsp;</h2>
                          <p>Museum Adventure is mobile application to make you have the extraordinary visit experience.</p>
                        </div>
                      </CardBody>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        );
      }

}

function mapStateToProps(state) {
    return {
        authData : state.authStore.authData,
        inProgress: state.authStore.inProgress,
        isAuthenticated: state.authStore.isAuthenticated
    }
}

export default connect(mapStateToProps, {fetchLogin}) (Login);