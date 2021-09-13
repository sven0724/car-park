/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useReactOidc } from '@axa-fr/react-oidc-context';

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CDataTable } from '@coreui/react'
import styles from './Style.module.css'
import {loopData, RAND_ID} from './components/mockData';
import axios from 'axios';
import { REACT_APP_APIURL } from '../configs/apiConfig';

const InductiveLoopDetector = () => {
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');
  const router = useHistory();
  const { oidcUser, logout } = useReactOidc();

  const fields = [
    { key: 'name', _style: { width: '40%'} },
    { key: 'loopType', _style: { width: '40%'} },
  ];
  const checkBoxFields = [ { key: 'checkbox', label:'', _style:{width:'10px'}, sorter:false, filter:false},]
  const [items, setItems] = useState(loopData);
  const handleClick = (e:any) => {
    router.push('/entrance/inductive-loop-detector/' + e.id);
  }

  const AddItem = () => {
    router.push('/entrance/inductive-loop-detector/' + RAND_ID)
  }

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    var result = axios.get(`${REACT_APP_APIURL}InductiveLoopDetector`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) => {
      console.log("data receivevd", res.data.data);
      setItems(res.data.data);
    }).catch((err) => {
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus == 401) logout();
    });  
    return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  }, []);


  return (
    <CCard>
      <CCardHeader className={styles.cardHeader}>
      Inductive Loop Detector
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
export default InductiveLoopDetector
