import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function useAuth(code) { 
    const [refreshToken, setRefreshToken] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    //get code from url
    // const code = new URLSearchParams(window.location.search).get('code');


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
                localStorage.setItem('token', decodedToken.accessToken);

            }).catch(error => {
                console.log(error);
                // window.location = '/';
            });
    }, [code]);

    // useEffect(() => {
    //     const checkTokenExpiry = async () => {
    //       try {
    //         const decodedToken = jwt_decode(token);
    //         const tokenExpiryTimestamp = decodedToken.exp * 1000;
    //         const currentTime = new Date().getTime();
      
    //         if (tokenExpiryTimestamp < currentTime) {
    //           // Token has expired, request new one
    //           const response = await axios.post('http://localhost:3001/refresh', {
    //             refreshToken,
    //           });
    //           // store token in local storage
    //           setToken(response.data.token);
    //           localStorage.setItem('token', response.data.token);
    //         }
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
      
    //     checkTokenExpiry();
    //   }, [token, refreshToken]);

    return token; // return token to be used in other components

};
