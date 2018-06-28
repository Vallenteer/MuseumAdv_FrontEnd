import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import { clearAuth } from '../../../actions/auth-actions.jsx';
import {connect} from "react-redux";

class Logout extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.clearAuth();
    }
    render() {
        return (<Redirect to='/login' />)
    }
}

function mapStateToProps(state){
    return {
        authData: state.authStore.authData
    }
}

export default connect(mapStateToProps, {clearAuth}) (Logout);