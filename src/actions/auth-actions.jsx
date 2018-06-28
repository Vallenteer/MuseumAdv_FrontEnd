import axios from 'axios';
import {toast} from 'react-toastify';


export const FETCH_LOGIN = 'FETCH_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const FAILED_LOGIN = 'FAILED_LOGIN'
export const FETCH_LOGOUT = 'FETCH_LOGOUT'
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'
export const FETCH_CHECK_AUTH = 'FETCH_CHECK_AUTH'
export const RECEIVE_CHECK_AUTH = 'RECEIVE_CHECK_AUTH'

var self = this;

export function fetchLogin(userEmail,userPassword){
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_LOGIN
        })
        axios({
            method:'post',
            headers: {"Access-Control-Allow-Origin": "*"},
            url: 'http://museumadv.azurewebsites.net/login',
            data: {
                email: userEmail,
                password: userPassword
            }
        })
        // axios.post('http://museumadv.azurewebsites.net/login',{
        //     email: userEmail,
        //     password: userPassword
        // })
        .then((response) => {
            if(response.status == 200) {
                if(response.data.message == "User not Found!" || response.data.message == "Password Invalid!!") {
                    dispatch({
                        type: FAILED_LOGIN
                    })
                    return toast.error("Invalid email or password! Please try again!");
                }
                else {
                    dispatch( {
                        type: RECEIVE_LOGIN,
                        payload: response.data
                    })
                    sessionStorage.MSMADVlt = window.btoa(JSON.stringify(response.data));
                }
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }
}

export function checkAuth() {
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_CHECK_AUTH
        })
        dispatch({
            type: RECEIVE_CHECK_AUTH
        })
    }
}

export function clearAuth() {
    sessionStorage.clear();
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_LOGOUT
        })
        dispatch({
            type: RECEIVE_LOGOUT
        })
    }
}