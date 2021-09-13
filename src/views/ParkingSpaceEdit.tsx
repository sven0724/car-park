/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable, CFormGroup, CInvalidFeedback, CValidFeedback, CToaster, CToast, CToastBody, CToastHeader, CInputCheckbox } from '@coreui/react'
import styles from './Style.module.css'
import {parkingZoneData, carTypeData, RAND_ID} from './components/mockData'
import  ToastComponent  from '../reusable/ToastComponent';
import axios from 'axios'
import { REACT_APP_APIURL } from '../configs/apiConfig'
import Modal from '../reusable/Modal'
import { useReactOidc } from '@axa-fr/react-oidc-context'

const ParkingSpaceEdit = (props:any) => {

  const router = useHistory();
  const id = props.match.params.id;
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [danger, setDanger] = useState(false);
  const [name, setName] = useState('');
  const [parkingData, setParkingData] = useState([{'id':'', 'name':''}]);
  const [parkingZoneId, setParkingZoneId] = useState('');
  const [lastOccupiedCarPlate, setLastOccupiedCarPlate] = useState('');
  const [isReserved, setIsReserved] = useState('');
  const [flag, setFlag] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [lastOccupiedTime, setLastOccupiedTime] = useState('');
  const [status, setStatus] = useState('0');
  const [type, setType] = useState('0');
  const [rentType, setRentType] = useState(0);
  const { oidcUser, logout } = useReactOidc();

  useEffect(() => {
    var carResult = axios.get(`${REACT_APP_APIURL}ParkingZone/All`, {
      headers:{
      'Authorization':token,
      'ORGID':orgID,
      }
    });
    carResult.then((res) =>{
      setParkingData(res.data);
    }).catch((err) =>{
    console.log("error", err);
    var errStatus = err.response.status;
    if(errStatus === 401) logout()
    })
    if(id!==RAND_ID){
      var result = axios.get(`${REACT_APP_APIURL}ParkingSpace/${id}`, {
      headers:{
        'Authorization':token,
        'ORGID':orgID,
      }
      });
      result.then((res) =>{
        setName(res.data.name);
        setFlag(res.data.isReserved);
        if(res.data.lastOccupiedCarPlate) setLastOccupiedCarPlate(res.data.lastOccupiedCarPlate);
        setStatus(res.data.status);
        setType(res.data.type);
        setRentType(res.data.rentType);
        setParkingZoneId(res.data.parkingZoneId);
        setDate(res.data.lastOccupiedTime.substr(0,10))
        setTime(res.data.lastOccupiedTime.substr(11,5));
        var lastTime = res.data.lastOccupiedTime.substr(0,10) + 'T' + res.data.lastOccupiedTime.substr(11,5);
        setLastOccupiedTime(lastTime);
      }).catch((err) =>{
        console.log("error------->", err);
      }) 
    }   
  }, []);

  const BackItem =()=>{
    router.push('/parking/parking-space/')
  }

  const SaveItem =() =>{
    console.log("last data: ",lastOccupiedTime);
      if( id === RAND_ID){
        var result = axios.post(`${REACT_APP_APIURL}ParkingSpace`, {
          'id':id,
          'name':name,
          'isReserved':flag,
          'lastOccupiedTime':lastOccupiedTime,
          'parkingZoneId':parkingZoneId,
          'status':Number(status),
          'type':Number(type),
          'lastOccupiedCarPlate':lastOccupiedCarPlate,
        }, {
            headers:{
              'Authorization':token,
              'ORGID':orgID,
            }
        });
        result.then((res) =>{
          console.log("Id_created------>", res.data.id);
          setContent('Record Save');
          if(res.data.id){
            setRentType(res.data.rentType);
            setVisible(true);
            setTimeout(() => {
              router.push(`/parking/parking-space/${res.data.id}`); 
            }, 5000);
          }
        }).catch((err) =>{
          console.log("error----------->", err);
        })
      }else
      {
        var result = axios.put(`${REACT_APP_APIURL}ParkingSpace/${id}`, {
          'id':id,
          'name':name,
          'isReserved':flag,
          'lastOccupiedTime':lastOccupiedTime,
          'parkingZoneId':parkingZoneId,
          'status':Number(status),
          'type':Number(type),
          'lastOccupiedCarPlate':lastOccupiedCarPlate,
          'rentType':rentType
        }, {
            headers:{
              'Authorization':token,
              'ORGID':orgID,
            }
        });
        result.then((res) =>{
          console.log("Information_Saved------>", res.data.id);
          setContent('Record Save');
          setVisible(true);
          setTimeout(() => {
            router.push(`/parking/parking-space/${res.data.id}`); 
          }, 5000);
        }).catch((err) =>{
          console.log("error----------->", err);
        })
      }

    }
    const handleChange =(e:any) =>{
      var tempValue = e.target.value;
      switch (e.target.name) {
        case 'name':
          setName(tempValue)
          console.log("name changed", e.target.value);
          break;
        case 'lastOccupiedCarPlate':
          setLastOccupiedCarPlate(tempValue);
          console.log("name changed", e.target.value);
          break;   
        case 'time-input':
          setTime(tempValue);
          setLastOccupiedTime(date + 'T' + time);
          console.log("name changed", e.target.value);
          break;
        case 'date-input':
          setDate(tempValue);  
          setLastOccupiedTime(date + 'T' + time);
          console.log("name changed", e.target.value);
          break;
        case 'statusSelect':
          setStatus(tempValue);
          console.log("name changed", e.target.value);
          break;
        case 'parkingZoneSelect':
          setParkingZoneId(tempValue);
          console.log("name changed", e.target.value);
          break;
        case 'typeSelect':
          setType(tempValue);
          console.log("name changed", e.target.value);
          break; 
        case 'isReserved':
          setFlag(e.target.checked);
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
        var result = axios.delete(`${REACT_APP_APIURL}ParkingSpace/${id}`, {
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
              router.push('/parking/parking-space/');
            }, 5000);

        }).catch((err) =>{
          console.log("error", err);
        })
      }
    }
    const Cancel = () =>{
      setDanger(false);
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
        Parking Space 
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
              <h5>Parking Space Information</h5>
                  <CFormGroup className="row">
                    <div className="col-md-2">
                        <CLabel htmlFor="name">Name</CLabel>
                    </div>
                    <div className="col-md-10">
                      <CInput 
                        className="is-invalid"
                        type="string"
                        id="name"
                        name="name"
                        placeholder="name"
                        autoComplete="given-name"
                        required
                        value={name}
                        onChange={(e) =>handleChange(e)}
                        // onInput={(e) =>handleInput(e)}
                        />
                    </div>
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">Input provided</CValidFeedback>

                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Parking Zone</CLabel>
                      </div>
                      <div className="col-md-10" style={{marginTop:'15px'}}>
                           <CSelect name="parkingZoneSelect" id="selectParking" value={parkingZoneId} onChange={(e) =>handleChange(e)}>
                             {parkingData.map((item, index) =>{
                               return(
                                <option key={index} value={item.id} >{item.name}</option>
                               )
                             } )}
                          </CSelect>
                      </div>

                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Type</CLabel>
                      </div>
                      <div className="col-md-10" style={{marginTop:'15px'}}>
                        
                           <CSelect name="typeSelect" id="selectType" value={type} onChange={(e) =>handleChange(e)}>
                              <option value="0" >Private Car</option>
                              <option value="1" >Truck</option>
                              <option value="2" >Motorcycle</option>
                              <option value="3" >EV</option>
                              <option value="4" >Disabled</option>
                             

                          </CSelect>
                      </div>

                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Status</CLabel>
                      </div>
                      <div className="col-md-10" style={{marginTop:'15px'}}>
                           <CSelect name="statusSelect" id="selectStatus" value={status} onChange={(e) =>handleChange(e)}>
                              <option value="0" >Pending</option>
                              <option value="1" >Occupied</option>
                          </CSelect>
                      </div>

                      <div className="col-md-2">
                        <CLabel htmlFor="name" className={styles.custom_label}>Last Occupied Car Plate</CLabel>
                      </div>
                      <div className="col-md-10" style={{marginTop:'15px'}}> 
                        <CInput 
                          className="is-valid"
                          type="string"
                          id="name"
                          name="lastOccupiedCarPlate"
                          placeholder="name"
                          autoComplete="given-name"
                          required
                          value={lastOccupiedCarPlate}
                          onChange={(e) =>handleChange(e)}
                          />
                      </div>

                      <div className="col-md-2">
                        <CLabel htmlFor="name" className={styles.custom_label}>Last Occupied Time</CLabel>
                      </div>
                      <div className="col-md-5" style={{marginTop:'15px'}}> 
                        <CInput type="date" id="date-input" name="date-input" value={date} placeholder="date" onChange={(e) =>handleChange(e)}/>

                      </div>
                      <div className="col-md-5" style={{marginTop:'15px'}}> 
                        <CInput type="time" id="time-input" name="time-input" value={time} placeholder="date" onChange={(e) =>handleChange(e)}/>

                      </div>

                      <div className="col-md-2">
                        <CLabel htmlFor="name" className={styles.custom_label}>Reserved</CLabel>
                      </div>

                      <div className="col-md-5" style={{marginTop:'15px', marginLeft:'20px'}}> 
                        <CInputCheckbox 
                          id="checkbox1" 
                          checked={flag}
                          name="isReserved" 
                          value={isReserved}
                          onChange={(e) =>handleChange(e)}
                        />

                      </div>
                  </CFormGroup>
            </div>

          </div>
        </CForm>
      </CCardBody>
    </CCard>
    </>
  );
};
export default ParkingSpaceEdit
