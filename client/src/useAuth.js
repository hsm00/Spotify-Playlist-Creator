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
        const currentTime = new Date();
        if (tokenExpiryTimestamp > currentTime) return;
          // Token has expired, request new one
          axios.post('http://localhost:3001/refresh', {
            refreshToken,
          })
          .then(response => {
            // store token in local storage
            const decodedToken = jwt_decode(response.data.token);
            sessionStorage.setItem('accessToken', decodedToken.accessToken);
        
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1);
            sessionStorage.setItem('expiration', expiration);
            
            console.log('Token refreshed');
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
      

    return token; // return token to be used in other components

};