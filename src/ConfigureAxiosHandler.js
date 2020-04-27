import React from 'react';
import Axios from 'axios'
import { setLoading, redirect, setUser } from './store/actions';


/* const setLoading = (dispatch, load) => {           
    let type = load ? 'LOADING_START' : 'LOADING_STOPA'

    dispatch({ type });
} */

export const axiosConfig = () => {

    Axios.interceptors.request.use(function (request) {
        console.log('************************ LAODING TRUE', request);
        let token = localStorage.getItem('@token/bexsit');   
        request.headers.Authorization = `Bearer ${token}`;

        setLoading(true);
        return request;
      }, function (error) {
        //console.log('************************ Axios.interceptors request error', error);
        setLoading(false);
        //setLoading(dispatch, false);
        // Do something with request error
        return Promise.reject(error);
    });

    Axios.interceptors.response.use((response) => {
            //console.log('************************ LAODING FALSE', response, response.data.userId, response.data.username);
            if(response.data.userId && response.data.username) setUser(response.data.userId, response.data.username, response.data.user);
            setLoading(false);
            //setLoading(dispatch, false);
            return response;
        },(error) => {
            //console.log('************************* Axios.interceptors response error', error); 
            setLoading(false);
            //setLoading(dispatch, false);

        if (error.response.status === 401) {    
            const requestConfig = error.config;
            localStorage.setItem('@token/bexsit', null);
            redirect('/login');
            //return Axios(requestConfig);
        }
        return Promise.reject(error);
    });
}