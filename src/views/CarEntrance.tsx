/* eslint-disable */
import React, { useEffect, useState } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CDataTable } from '@coreui/react'
import styles from './Style.module.css'
import {RAND_ID} from './components/mockData';
import axios from 'axios';
import { REACT_APP_APIURL } from '../configs/apiConfig';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const CarEntrance = () => {
  const router = useHistory();
 
  const fields = [
    { key: 'name', _style: { width: '40%'} },
    { key: 'status', _style: { width: '40%'} },
    { key: 'lastOctopusNumber', _style: { width: '40%'} },
  ];
  // const checkBoxFields = [ { key: 'checkbox', label:'', _style:{width:'10px'}, sorter:false, filter:false},]
  const {logout} = useReactOidc();
  const [items, setItems] = useState([]);
  
  const handleClick = (e:any) =>{
    router.push('/entrance/car-entrance/' + e.id);
  }
  const AddItem =()=>{
    router.push('/entrance/car-entrance/' + RAND_ID)
  }
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');

  useEffect(() => {
    // let isMounted = true; // note this flag denote mount status
    var result = axios.get(`${REACT_APP_APIURL}CarEntrance`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) =>{
      console.log("data receivevd", res.data.data);
      for(var i=0; i< res.data.data.length; i++){
        if(res.data.data[i].lastOctopusNumber == null){
          res.data.data[i].lastOctopusNumber = ''
        }
      }
      setItems(res.data.data);
    }).catch((err) =>{
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus === 401) logout();
    });  
    
  }, []);

  return (
    <CCard>
      <CCardHeader className={styles.cardHeader}>
      CarEntrance
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
export default CarEntrance
