import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code) {
    var storedAccessToken = window.localStorage.getItem("accessToken");
    const [accessToken, setAccessToken] = useState(storedAccessToken);
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState(window.localStorage.getItem("expiresIn"));

    useEffect(() => {
        if(accessToken) return
        axios.post('http://localhost:3001/login', {
            code, 
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                console.log(res.data)
                window.localStorage.setItem("accessToken", res.data.accessToken);
                window.localStorage.setItem("refreshToken", res.data.refreshToken);
                window.localStorage.setItem("expiresIn", res.data.expiresIn);
            }).catch((err) => {
                console.log(err)
                // window.location = '/';
            })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn || !accessToken) return
        const interval = setInterval(() => {
            axios.post('http://localhost:3001/refresh', {
                refreshToken,
            }).then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
                window.localStorage.setItem("accessToken", res.data.accessToken);
                console.log('refreshToken called')
            }).catch((err) => {
                console.log(err)
                window.location = '/';   
            })
        }, (expiresIn - 60) * 1000)
        return () => clearInterval(interval)
    }, [refreshToken, expiresIn, accessToken])
    console.log(accessToken)
    return accessToken
}
