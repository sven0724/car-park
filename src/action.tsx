/* eslint-disable */

import axios from 'axios';
import {REACT_AUTHORITY_URL} from './configs/apiConfig';
// import { useReactOidc } from '@axa-fr/react-oidc-context';
import { Dispatch } from 'redux';


export const GET_CAR_PARK = '[PARKING] GET CAR PARK';
export const GET_BARRIER_GATE = '[PARKING] GET BARRIER GATE';
export const GET_CAMERA = '[PARKING] GET CAMERA';
export const GET_CAR_ENTRANCE = '[PARKING] GET CAR ENTRANCE';
export const GET_PARKING_ZONE = '[PARKING] GET PARKING ZONE';
export const GET_PARKING_SPACE = '[PARKING] GET PARKING SPACE';
export const GET_INDUCTIVE_LOOP_DETECTOR = '[PARKING] GET INDUCTIVE LOOP DETECTOR';
export const GET_OCTOPUS_DEVICE = '[PARKING] GET OCTOPUS DEVICE';
export const GET_ENTRANCE_RECORD = '[PARKING] GET ENTRANCE RECORD';
export const GET_MONTHLY_PARKING_RECORD = '[PARKING] MONTHLY PARKING RECORD';
export const GET_CUSTOMER = '[PARKING] CUSTOMER';
export const GET_PRICE_LIST = '[PARKING] PRICE LIST';
export const GET_HOLIDAY = '[PARKING] HOLIDAY';

export const getCarPark = () => (dispatch:Dispatch) =>{

    var result = axios.get(`${REACT_AUTHORITY_URL}CarPark`, {
        headers:{
            'Authorization': sessionStorage.getItem('token'),
            'ORGID': sessionStorage.getItem('ORGID')
          }
    });
    result.then((res) =>{
        console.log("data receivevd", res.data.data);
        dispatch({
            type:GET_CAR_PARK,
            payload: res.data.data
        });
    }).catch((err) =>{
        console.log("error------->", err);
    });

}