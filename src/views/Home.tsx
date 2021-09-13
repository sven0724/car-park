/* eslint-disable */

import { useReactOidc } from '@axa-fr/react-oidc-context';
import { useHistory} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { REACT_AUTHORITY_URL } from '../configs/apiConfig';
import axios from 'axios';


const Home = () => {
  const { oidcUser, logout } = useReactOidc();
  const router = useHistory();
  sessionStorage.setItem('token', oidcUser.token_type + ' ' + oidcUser.access_token);
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    var result = axios.get(`${REACT_AUTHORITY_URL}Organization/ClientId/car-park-system`, {
      headers:{
        'Authorization':token,
      }
    })
    result.then((res) =>{
      sessionStorage.setItem('ORGID', res.data[0].id);
    }).catch((err) =>{
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus == 401) logout();
    })
  }, [])
  var url = window.location.pathname;
  if(oidcUser && url !=='/') {
    setTimeout(() => {
      router.push(url);
    }, 400);
  };
  return (
    <>
     
    </>
  )
}

export default Home
