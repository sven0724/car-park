/* eslint-disable */

import React, { useEffect, useState } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton,  CDataTable } from '@coreui/react'
import styles from './Style.module.css'
import axios from 'axios';
import { REACT_APP_APIURL } from '../configs/apiConfig';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const Camera = () => {
  const router = useHistory();
  const RAND_ID = '00000000-0000-0000-0000-0000000000';
  const fields = [
    { key: 'name', _style: { width: '23%'} },
    { key: 'ipAddress', _style: { width: '23%'} },
    { key: 'lastCarPlate', _style: { width: '23%'} },
    { key: 'lastResponseTime', _style: { width: '31%'} },
  ];
  // const checkBoxFields = [ { key: 'checkbox', label:'', _style:{width:'10px'}, sorter:false, filter:false},]
  const { logout } = useReactOidc();
  const [items, setItems] = useState([]);
  const handleClick = (e:any) =>{
    console.log("item->", e);
    console.log("button clicked");
    router.push('/entrance/camera/' + e.id);
  }
  const AddItem =()=>{
    router.push('/entrance/camera/' + RAND_ID)
  }
  const token = sessionStorage.getItem('token');
  console.log("token---------->", token);
  const orgID = sessionStorage.getItem('ORGID');

  useEffect(() => {
    // let isMounted = true; // note this flag denote mount status
    var result = axios.get(`${REACT_APP_APIURL}Camera`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) =>{
      console.log("data receivevd", res.data.data);
      for(var i=0; i< res.data.data.length; i++){
        if(res.data.data[i].lastCarPlate == null){
          res.data.data[i].lastCarPlate = ''
        }
       
        if(res.data.data[i].lastResponseTime == null){
          res.data.data[i].lastResponseTime = '2021-01-01 00:00:00'
        }else{
          var tempDate = res.data.data[i].lastResponseTime.split('T');
          var tempTime = tempDate[1].split(tempDate[1].substr(-1))[0];
          var resultResponse = tempDate[0] + ' ' + tempTime;
          res.data.data[i].lastResponseTime = resultResponse;
        }

      }

      setItems(res.data.data);

    }).catch((err) =>{
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus === 401) logout();
    });  
    // return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  }, []);


  return (
    <CCard>
      <CCardHeader className={styles.cardHeader}>
      Camera
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
export default Camera
