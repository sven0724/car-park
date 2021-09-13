/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable, CFormGroup, CInvalidFeedback, CValidFeedback, CToaster, CToast, CToastBody, CToastHeader } from '@coreui/react'
import styles from './Style.module.css'
import  ToastComponent  from '../reusable/ToastComponent';
import { RAND_ID } from './components/mockData';
import { REACT_APP_APIURL, REACT_AUTHORITY_URL } from '../configs/apiConfig';
import axios from 'axios';
import Modal from '../reusable/Modal';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const CarParkEdit = (props:any) => {
  const router = useHistory();
  const [visible, setVisible] = useState(false);
  const id = props.match.params.id;
  const [name, setName] = useState('');
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');
  const [danger, setDanger] = useState(false);
  const [content, setContent] = useState('');
  const [flag, setFlag] = useState(false);
  const [items, setItems] = useState([]);
  const { oidcUser, logout, events } = useReactOidc();

  const fields = [
    { key: 'parkingZoneName', label: 'Parking Zone Name', _style: { width: '20%'} },
    { key: 'totalParkingSpaces', label: 'Total Space', _style: { width: '20%'} },
    { key: 'usedParkingSpace',  label: 'Used Space',_style: { width: '20%'} },
    { key: 'remainParkingSpace', label: 'Remained Space', _style: { width: '20%'} },
    { key: 'reservedParkingSpace', label: 'Reserved Space', _style: { width: '20%'} },
  ]; 

  useEffect(() => {
    if(id!==RAND_ID){
      setFlag(true);
      var result = axios.get(`${REACT_APP_APIURL}CarPark/${id}`, {
        headers:{
          'Authorization':token,
          'ORGID':orgID,
        }
      });
      result.then((res) =>{
        setName(res.data.name);
        console.log("the response when the id is not random", res.data.name);
      }).catch((err) =>{
        console.log("error: ", err);
        var errStatus = err.response.status;
        if(errStatus == 401) logout();
      }) 

      var result = axios.get(`${REACT_APP_APIURL}CarPark/AvailableSpaces?id=${id}`, {
        headers:{
          'Authorization':token,
          'ORGID':orgID,
        }
      });
      result.then((res) =>{
        console.log(res.data);
        setItems(res.data);

      }).catch((err) =>{
        console.log("error: ", err);
        var errStatus = err.response.status;
        if(errStatus == 401) logout();
      })

      // CarPark/AvailableSpaces?id={id}
    }   
  }, []);
    
  const BackItem =()=>{
    router.push('/parking/car-park/')
    // router.goBack();
  }
  const SaveItem =() =>{
    if( id===RAND_ID){
      var result = axios.post(`${REACT_APP_APIURL}CarPark`, {
        'id':id,
        'name':name
      }, {
          headers:{
            'Authorization':token,
            'ORGID':orgID,
          }
      });
      result.then((res) =>{
        console.log("Id_created------>", res.data.id);
        setContent('Record Save')
        if(res.data.id){
          setVisible(true);
          setTimeout(() => {
            router.push(`/parking/car-park/${res.data.id}`); 
          }, 5000);
          
        }
      }).catch((err) =>{
        console.log("error----------->", err);
      })
    }else
    {
      var result = axios.put(`${REACT_APP_APIURL}CarPark/${id}`, {
        'id':id,
        'name':name
      }, {
          headers:{
            'Authorization':token,
            'ORGID':orgID,
          }
      });
      result.then((res) =>{
        console.log("Information_Saved------>", res.data.id);
        setContent('Record Save')
        setVisible(true);
      }).catch((err) =>{
        console.log("error----------->", err);
      })
    }
  }
  const handleName =(e:any) =>{
    console.log("name changed", e.target.value);
    setName(e.target.value);
  }
  const DelItem =() =>{
    setDanger(true);
  }
  const Confirm =() =>{
    if(id!==RAND_ID){
      var result = axios.delete(`${REACT_APP_APIURL}CarPark/${id}`, {
        headers:{
          'Authorization':token,
          'ORGID':orgID,
        }
      })
      result.then((res) =>{
          console.log("success delete", res.data.id);
          setContent('Record Delete')
          setVisible(true);
          setTimeout(() => {
            router.push('/parking/car-park/');
          }, 5000);
      }).catch((err) =>{
        console.log("error", err);
      })
    }
  }
  const Cancel = () =>{
    setDanger(false);
  }

  const handleClick = (e:any) => {
    console.log("target: ", e.parkingZoneId);
    router.push('/parking/parking-zone/' + e.parkingZoneId);

  }
  return (
    <>
    {
      danger?
      <Modal show={danger} handleConfirm={Confirm} handleCancel={Cancel}/>:''
    }
    <CCard>
      {
        visible?
        <ToastComponent content={content}/>
        :''
      }
      <CCardHeader className={styles.cardHeader}>
        Car Park
      </CCardHeader>
      <CCardBody >
        <CForm 
          wasValidated={false}
          action="" method="post"
         >
          <CButtonToolbar
            className="justify-content-between"
            style ={{paddingBottom:'20px'}}
          >
            <CButton className="btn-default"  onClick={BackItem}
              style={{boxShadow: '0 1px 1px 0 rgba(60,75,100,.14),0 2px 1px -1px rgba(60,75,100,.12),0 1px 3px 0 rgba(60,75,100,.2)'}}>
              Back
            </CButton>  
            <div>
              <CButton className="btn-ghost-danger" style={{marginRight:'10px'}} onClick={DelItem} >Delete</CButton>
              <CButton className="btn-primary" onClick={SaveItem} >Save</CButton>
            </div>
              

          </CButtonToolbar>
          <div className="row">
            <div className="col-sm-12">
              <h5>Car Park Information</h5>
                  <CFormGroup className="row">
                    <div className="col-md-2">
                        <CLabel htmlFor="name" className={styles.custom_label}>Name</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px'}}>
                      <CInput 
                        className="is-invalid"
                        type="string"
                        id="name"
                        name="name"
                        placeholder="name"
                        autoComplete="given-name"
                        value={name}
                        required
                        // onInput={(e) =>handleInput(e)}
                        onChange={(e) =>handleName(e)}
                        />
                    </div>
                  { flag? 
                      <div className={styles.table}>
                        <CDataTable
                          items={items} 
                          fields={fields}
                          striped
                          itemsPerPageSelect={{label:'Items per page', values:[15, 30, 50, 100]}}
                          itemsPerPage={15}
                          hover
                          sorter
                          pagination
                          footer
                          onRowClick ={(e:any) =>handleClick(e)}
                        />
                      </div>
                    : ''
                    }
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">Input provided</CValidFeedback>
                  </CFormGroup>
            </div>

          </div>
        </CForm>
        {/* <CToaster
          position='top-right'
          key="first"
        >
          <CToast
              key={'toast'}
              show={true}
              autohide={true}
              fade={true}
            >
              <CToastHeader closeButton={true}>
                Save Success
              </CToastHeader>
              <CToastBody>
                Process of Saving is success!
              </CToastBody>
            </CToast>
        </CToaster> */}
       

      </CCardBody>
    </CCard>
  </>
  );
};
export default CarParkEdit
