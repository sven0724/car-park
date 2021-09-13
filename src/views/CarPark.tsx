/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable } from '@coreui/react'
import styles from './Style.module.css'
import {usersData} from './components/mockData';
import axios from 'axios';
import {REACT_APP_APIURL} from '../../src/configs/apiConfig'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { getCarPark } from '../action';
import Loading from '../reusable/Loading';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const CarPark = () => {

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([]);
  const token = sessionStorage.getItem('token');
  console.log("token---------->", token);
  const orgID = sessionStorage.getItem('ORGID');
  const router = useHistory();
  const RAND_ID = '00000000-0000-0000-0000-0000000000';
  const fields = [
    { key: 'name', _style: { width: '40%'} },
  ]; 
  const checkBoxFields = [ { key: 'checkbox', label:'', _style:{width:'10px'}, sorter:false, filter:false},]
  const { oidcUser, logout, events } = useReactOidc();

  const handleClick = (e:any) =>{
    console.log("item->", e);
    console.log("button clicked");
    router.push('/parking/car-park/' + e.id);
  }
  const AddItem =()=>{
    router.push('/parking/car-park/' + RAND_ID)

  }
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    var result = axios.get(`${REACT_APP_APIURL}CarPark`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) =>{
      console.log("data receivevd", res.data.data);
      setItems(res.data.data);
      setLoading(false);
    }).catch((err) =>{
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus == 401) logout();
    });  
      return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  }, []);
  return (
  <>
    {loading === false ? (
    <CCard>
      <CCardHeader className={styles.cardHeader}>
        Car Parks
      </CCardHeader>
      
      <CCardBody >
        <CButtonToolbar
          className="justify-content-end"
        >
          <CButton className="btn-primary" onClick={AddItem} >Add</CButton>  
        </CButtonToolbar>
        <div className={styles.table}>
          <CDataTable
            items={items} 
            fields={fields}
            striped
            columnFilter
            tableFilter
            itemsPerPageSelect={{label:'Items per page', values:[15, 30, 50, 100]}}
            itemsPerPage={15}
            hover
            sorter
            pagination={true}
            // activePage={1} 
            footer
            onRowClick ={(e:any) =>handleClick(e)}
          />
        </div>
      </CCardBody>
    </CCard>
     ):(<Loading />)}
  </>
  );
}
export default CarPark
