import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react';
export default function useAuth(code) { 
    const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refreshToken')? sessionStorage.getItem('refreshToken') : '');
    const [token, setToken] = useState(sessionStorage.getItem('accessToken')? sessionStorage.getItem('accessToken') : '');
    const [tokenExpiryTimestamp, setTokenExpiryTimestamp] = useState(new Date(sessionStorage.getItem('expiration')) ? new Date(sessionStorage.getItem('expiration')) : '');


    useEffect(() => {
        if (!code) return;
        if (token) return;
        axios.post('http://localhost:3001/login', {
            code, 
            })
            .then(response => {
                // setToken(response.data.token);
                const decodedToken = jwt_decode(response.data.token);
                setRefreshToken(decodedToken.refreshToken);
                setToken(decodedToken.accessToken)
                sessionStorage.setItem('refreshToken', decodedToken.refreshToken);
                sessionStorage.setItem('accessToken', decodedToken.accessToken);

                const expiration = new Date()
                expiration.setHours(expiration.getHours() + 1);
                sessionStorage.setItem('expiration', expiration);

                console.log('token set');

            }).catch(error => {
                console.log(error);
                // window.location = '/';
            });
    }, [code]);

    useEffect(() => {
      const refreshAccessToken = () => {
        const currentTime = new Date();
        const expired = currentTime > tokenExpiryTimestamp;
        if (tokenExpiryTimestamp > currentTime) return Promise.resolve(token); // Return the current token as a resolved promise
        // Token has expired, request new one
        return axios.post('http://localhost:3001/refresh', {
          refreshToken,
        })
          .then(response => {
            // store token in local storage
            const decodedToken = jwt_decode(response.data.token);
            sessionStorage.setItem('accessToken', decodedToken.accessToken);
            setToken(sessionStorage.getItem('accessToken'));
    
            const expiration = new Date();
            expiration.setMinutes(expiration.getMinutes() + 59);
            sessionStorage.setItem('expiration', expiration);
    
            console.log('Token refreshed');
            return decodedToken.accessToken; // return the new access token
          })
          .catch(error => {
            console.error(error);
          });
      };
      // run the function initially
      refreshAccessToken();
      // run the function every 59 minutes
      const interval = setInterval(() => {
        refreshAccessToken();
      }, 59 * 60 * 1000);
      // clear the interval on component unmount
      return () => clearInterval(interval);
    }, []);
    
      
    return token; // return token to be used in other components

};