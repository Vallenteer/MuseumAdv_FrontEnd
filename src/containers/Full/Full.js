import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';

//Logout Component
import Logout from '../../views/users/Logout/Logout.jsx';

import ManageMuseums from '../../views/Museums/ManageMuseums/ManageMuseums.jsx';
import ManageQuizzes from '../../views/Quizzes/ManageQuizzes/ManageQuizzes.jsx';


//redux
import {connect} from "react-redux";
import { checkAuth } from '../../actions/auth-actions.jsx';

class Full extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {

    const guestLinks = (
      <Redirect to="/login" />
    );

    const adminLinks = (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/logout" name="Logout" component={Logout}/>

                {/* Routing for Management */}
                <Route path="/museums/manage" name="Manage Museums" component={ManageMuseums}/>
                <Route path="/quizzes/manage" name="Manage Quizzes" component={ManageQuizzes}/>

                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );

    return this.props.isAuthenticated ? adminLinks : guestLinks;

  }
}

function mapStateToProps(state) {
  return {
    authData: state.authStore.authData,
    inProgress: state.authStore.inProgress,
    isAuthenticated: state.authStore.isAuthenticated
  }
}


export default connect(mapStateToProps, {checkAuth}) (Full);
