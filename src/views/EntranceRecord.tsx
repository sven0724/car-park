/* eslint-disable */

import React, { useEffect, useState } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable } from '@coreui/react'
import styles from './Style.module.css'
import {carTypeData } from './components/mockData';
import axios from 'axios';
import { REACT_APP_APIURL } from '../configs/apiConfig';

const EntranceRecord = () => {
  const router = useHistory();
  const RAND_ID = '00000000-0000-0000-0000-0000000000';
  const fields = [
    { key: 'name', _style: { width: '20%'} },
    { key: 'carPlate', _style: { width: '20%'} },
    { key: 'entryTime', _style: { width: '20%'} },
    { key: 'exited', _style: { width: '20%'} },
    { key: 'exitTime', _style: { width: '20%'} },

  ];

  const [items, setItems] = useState([]);
  const handleClick = (e:any) =>{
    console.log("item->", e);
    console.log("button clicked");
    router.push('/report/entrance-record/' + e.id);
  }
  const AddItem =()=>{
    router.push('/report/entrance-record/' + RAND_ID)
  }
  const token = sessionStorage.getItem('token');
  console.log("token---------->", token);
  const orgID = sessionStorage.getItem('ORGID');

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    var result = axios.get(`${REACT_APP_APIURL}EntranceRecord`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) =>{
      console.log("data receivevd", res.data.data);
      setItems(res.data.data);
    }).catch((err) =>{
      console.log("error------->", err);
    });  
    return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  }, []);


  return (
    <CCard>
      <CCardHeader className={styles.cardHeader}>
      Entrance Record
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
            activePage={1} 
            footer
            onRowClick ={(e:any) =>handleClick(e)}
          />
        </div>

      </CCardBody>
    </CCard>
  );
};
export default EntranceRecord
