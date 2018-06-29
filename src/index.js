import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Redirect} from "react-router";
import { Provider } from "react-redux";
import {
  Button
} from "reactstrap";

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'

//Login
import Login from './views/Users/Login/Login.jsx';

import store from './store.js';
import Axios from 'axios';

// function checkAuth() {
//   const storage = sessionStorage.MSMADVlt;
//   if(storage == null || storage == "") {
//     return <div>You are not authorized!
//           <Link to='/login'><Button color="primary" className="px-4">Click here to login</Button></Link>
//         </div>
//   }
//   else {
//     return <Redirect to='/dashboard' />
//   }
// }

ReactDOM.render((
  <Provider store={store}>
  <HashRouter>
    <Switch>
      <Route path="/login" name="Login" component={Login} />
      <Route path="/" name="Home" component={Full}/>
    </Switch>
  </HashRouter>
  </Provider>
), document.getElementById('root'));
