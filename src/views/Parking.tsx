/* eslint-disable */

import React, { useEffect, useState } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable, CFormGroup, CInvalidFeedback, CValidFeedback, CToaster, CToast, CToastBody, CToastHeader } from '@coreui/react'
import styles from './Style.module.css'
import {RAND_ID, usersData} from './components/mockData';
import  ToastComponent  from '../reusable/ToastComponent';
import axios from 'axios';
import { REACT_APP_APIURL } from '../configs/apiConfig';
import Modal from '../reusable/Modal';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const ParkingZoneEdit = (props:any) => {
  const router = useHistory();
  const [visible, setVisible] = useState(false);
  const [danger, setDanger] = useState(false);
  const id = props.match.params.id;
  const [name, setName] = useState('');
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');
  const [userData, setUserData] = useState([{'id':'', 'name':''}]);
  const [carParkId, setCarParkId] = useState('');
  const [content, setContent] = useState('');
  const [pagesize, setPagesize] = useState(localStorage.getItem("pageSize"));
  const [flag, setFlag] = useState(false);
  const [items, setItems] = useState([]);
  const fields = [
    { key: 'name', label: 'Car Space Name', _style: { width: '20%'} },
    { key: 'type', label: 'Car Space Type', _style: { width: '20%'} },
    { key: 'status',  label: 'Car Space Status',_style: { width: '20%'} },
  ]; 
  const { oidcUser, logout } = useReactOidc();

  
  useEffect(() => {
    var carResult = axios.get(`${REACT_APP_APIURL}CarPark/All`, {
        headers:{
          'Authorization':token,
          'ORGID':orgID,
        }
    });
    carResult.then((res) =>{
      setUserData(res.data);
    }).catch((err) =>{
      console.log("error", err);
      var errStatus = err.response.status;
      if(errStatus == 401) logout();
    })   
       
    if(id!==RAND_ID){
      setFlag(true);
      var result = axios.get(`${REACT_APP_APIURL}ParkingZone/${id}`, {
      headers:{
        'Authorization':token,
        'ORGID':orgID,
      }
      });
      result.then((res) =>{
        setName(res.data.name);
        setCarParkId(res.data.carParkId);
        console.log("the response when the id is not random", res.data.name);
      }).catch((err) =>{
        console.log("error------->", err);
      }) 



      var result = axios.get(`${REACT_APP_APIURL}ParkingSpace?page=1&filterBy=parkingZoneId%3D%22${id}%22&pageSize=${pagesize}`, {
        headers:{
          'Authorization':token,
          'ORGID':orgID,
        }
        });
        result.then((res) =>{
          console.log("aditionlay data: ", res.data);
          for(var i =0; i<res.data.data.length;i++){
            switch (res.data.data[i].type) {
              case 0:
                res.data.data[i].type = "Private Car"
                break;
              case 1:
                res.data.data[i].type = "Truck"
                break;
              case 2:
                res.data.data[i].type = "Motocycle"
                break; 
              case 3:
                res.data.data[i].type = "EV"
                break;    
              case 4:
                res.data.data[i].type = "Disable"
                break;             
              default:
                break;
            }
            switch (res.data.data[i].status) {
              case 0:
                res.data.data[i] = {...res.data.data[i],  status: "Free"}
                break;
              case 1:
                res.data.data[i].status = "Occupied"
                break;
              
              default:
                break;
            }
          }
          setItems(res.data.data)
        }).catch((err) =>{
          console.log("error------->", err);
      }) 
    } 
    

    
    
  }, []);
  const BackItem =()=>{
    router.push('/parking/parking-zone/')
  }
  const SaveItem =() =>{
    if( id===RAND_ID){
      var result = axios.post(`${REACT_APP_APIURL}ParkingZone`, {
        'id':id,
        'name':name,
        'carParkId':carParkId
      }, {
          headers:{
            'Authorization':token,
            'ORGID':orgID,
          }
      });
      result.then((res) =>{
        console.log("Id_created------>", res.data.id);
        if(res.data.id){
          setVisible(true);
          setTimeout(() => {
            router.push(`/parking/parking-zone/${res.data.id}`); 
          }, 5000);
          
        }
      }).catch((err) =>{
        console.log("error----------->", err);
      })
    }else{
      var result = axios.put(`${REACT_APP_APIURL}ParkingZone/${id}`, {
        'id':id,
        'name':name,
        'carParkId':carParkId,
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
  const handleChange = (e:any) =>{
    switch (e.target.name) {
      case 'name':
        setName(e.target.value)
        break;
      case 'select':
        setCarParkId(e.target.value)
        break;
    
      default:
        break;
    }
  }

  const DelItem =() =>{
    setDanger(true);
  }
  const Confirm =() =>{
    if(id!==RAND_ID){
      var result = axios.delete(`${REACT_APP_APIURL}ParkingZone/${id}`, {
        headers:{
          'Authorization':token,
          'ORGID':orgID,
        }
      })
      result.then((res) =>{
          setContent('Record delete')
          console.log("success delete", res.data.id);
          setVisible(true);
          setTimeout(() => {
            router.push('/parking/parking-zone/');
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
    console.log("target: ", e);
    router.push('/parking/parking-space/' + e.id);

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
        :
        ''
      }
      <CCardHeader className={styles.cardHeader}>
        Parking Zone
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
              <h5>Parking Zone Information</h5>

                  <CFormGroup className="row">
                    
                      <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              Name
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px',marginTop:'15px'}}>
                        <CInput 
                          className="is-invalid"
                          type="string"
                          id="name"
                          name="name"
                          placeholder="name"
                          autoComplete="given-name"
                          required
                          value={name}
                          onChange={(e) =>{handleChange(e)}}
                          />
                      </div>
                    
                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Car Park</CLabel>
                      </div>
                      <div className="col-md-10" style={{marginTop:'15px'}}>
                          <CSelect name="select" id="select" value={carParkId} onChange={(e) =>handleChange(e)}>
                             { 
                               userData.map((item, index) =>{
                                 return(
                                   <option key={index} value={item.id} >{item.name}</option>
                                 )
                               })
                             }
                          </CSelect>
                      </div>


                      { flag? 
                    <>
                      {
                      <div className={styles.table}>
                        <CDataTable
                          items={items} 
                          fields={fields}
                          striped
                          itemsPerPageSelect={{label:'Items per page', values:[5, 10, 15, 30]}}
                          itemsPerPage={5}
                          hover
                          // sorter
                          pagination={true}
                          footer
                          onRowClick ={(e:any) =>handleClick(e)}
                        />
                      </div>
                      }
                    </>: ''
                    }
                  </CFormGroup>
            </div>

          </div>
        </CForm>

      </CCardBody>
    </CCard>
    </>
  );
};
export default ParkingZoneEdit
