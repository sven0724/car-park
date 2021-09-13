/* eslint-disable */

import React, { useEffect, useState } from 'react'

import { useHistory, useLocation} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable, CPagination } from '@coreui/react'
import styles from './Style.module.css'
import {carTypeData, RAND_ID } from './components/mockData';
import axios from 'axios';
import {REACT_APP_APIURL} from '../../src/configs/apiConfig'
import Loading from '../reusable/Loading';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const ParkingSpace = () => {
  const router = useHistory();
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([]);
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');
  const fields = [
    { key: 'name', _style: { width: '40%'} },
    { key: 'type', _style: { width: '20%'} },
    { key: 'status', _style: { width: '40%'} },

  ];
  const { oidcUser, logout } = useReactOidc();

  // const queryPage = useLocation().search.match(/page=([0-9]+)/)
  // const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  // const [page, setPage] = useState(currentPage)

  // const pageChange = (newPage:any) => {
  //   currentPage !== newPage && router.push(`/ParkingSpace?page=${newPage}`)
  // }

  // useEffect(() => {
  //   currentPage !== page && setPage(currentPage)
  // }, [currentPage, page])

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    var result = axios.get(`${REACT_APP_APIURL}ParkingSpace`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) =>{
      for(var i =0; i<res.data.data.length;i++){
        if(res.data.data[i].type ==0 ) res.data.data[i].type ='Private car';
        else res.data.data[i].type ='Truck';
      }
      setItems(res.data.data);
      setLoading(false);
    }).catch((err) =>{
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus === 401) logout()
    });  
    return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  }, []);

  const handleClick = (e:any) =>{
    console.log("item->", e);
    console.log("button clicked");
    router.push('/parking/parking-space/' + e.id);
  }
  const AddItem =()=>{
    router.push('/parking/parking-space/' + RAND_ID)
  }



  return (
    <>
    {loading === false ? (
    <CCard>
      <CCardHeader className={styles.cardHeader}>
        Parking Space
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
            {/* <CPagination
            activePage={1}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          /> */}
        </div>

      </CCardBody>
    </CCard>
        ):(<Loading />)}
        </>
  );
};
export default ParkingSpace
