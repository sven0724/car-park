/* eslint-disable */

import React, { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton,  CForm, CLabel, CInput, CSelect,  CFormGroup, CInvalidFeedback, CValidFeedback } from '@coreui/react'
import styles from './Style.module.css'
import  ToastComponent  from '../reusable/ToastComponent';
import axios from 'axios';
import { REACT_APP_APIURL, SERVER_URL } from '../configs/apiConfig';
import image from '../assets/images/image.png'
import { useServerTimeHub } from '../services/server-time-hub';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import Modal from '../reusable/Modal';
import { RAND_ID } from './components/mockData';

const CarEntranceEdit = (props:any) => {
  interface devType {
    carEntranceId:string,
    connectorDeviceId: string,
    id:string,
    name:string,
  }
  const {logout } = useReactOidc();

  const id = props.match.params.id;
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');
  const [content, setContent] = useState('');
  const [danger, setDanger] = useState(false);
  const [data, setData] = useState<any>(null);
  const [carPark, setCarPark] = useState([{'id':'', 'name':''}]);
  const [parkingZone, setParkingZone] = useState([{'id':'', 'name':''}]);
  const [device, setDevice] = useState([{'id':'', 'name':''}]);
  const [dev, setDev] = useState<any>(null);
  const [devT, setDevT] = useState<any>(null);
  const [carParkName, setCarParkName] = useState('');
  const [selCarPark, setSelCarPark] = useState('');
  const [selFrom, setSelFrom] = useState('');
  const [selTo, setSelTo] = useState('');
  const [selType, setSelType] = useState(0);
  const [selStatus, setSelStatus] = useState(0);
  const [selPlate, setSelPlate] = useState('');
  const [selOctopus, setSelOctopus] = useState('');
  const router = useHistory();
  
  // const [field, setField] = useState('Please tap the card again');
  const {message, sound, isConnected} = useServerTimeHub(id, SERVER_URL);
  console.log("page Loaded:--------------------------------> ", isConnected);
  const [time, setTime] = useState('message');
  useEffect(() => {
  var result = axios.get(`${REACT_APP_APIURL}CarEntrance/${id}`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) => {
      if(res.data.lastCarPlate == null){
        res.data.lastCarPlate = '';
      }
      if(res.data.lastOctoputNumber == null){
        res.data.lastOctoputNumber = '';
      }
      console.log("response: ", res.data);
      setDev(res.data.entranceDevices);
      setDevT(res.data.entranceDevices);
      setData(res.data);
      setCarParkName(res.data.name);
      setSelCarPark(res.data.carParkId);
      setSelFrom(res.data.fromZoneId);
      setSelTo(res.data.toZoneId);
      setSelType(res.data.carType);
      setSelStatus(res.data.status);
      setSelPlate(res.data.lastCarPlate);
      if(res.data.lastOctopusNumber === null) res.data.lastOctopusNumber ='';
      setSelOctopus(res.data.lastOctopusNumber);
    }).catch((err) =>{
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus === 401) logout();
    })

    var result = axios.get(`${REACT_APP_APIURL}CarPark/All`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) =>{
      setCarPark(res.data);
      console.log("carPark: ", res.data);
    }).catch((err) =>{
      console.log("error: ", err);
    })
    var result = axios.get(`${REACT_APP_APIURL}ParkingZone/All`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) =>{
      setParkingZone(res.data);
    }).catch((err) =>{
      console.log("error: ", err);
    })
    // L: /api/ConnectorDevice/Al
    var result = axios.get(`${REACT_APP_APIURL}ConnectorDevice/All`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) =>{
      setDevice(res.data);
    }).catch((err) =>{
      console.log("error: ", err);
    })

  }, [isConnected]);

  console.log("car-park-edit");
  const BackItem =()=>{
    router.push('/entrance/car-entrance/')
  }
  // const SaveItem = () => {
  //   if(id!==RAND_ID){
  //     var result = axios.put(`${REACT_APP_APIURL}CarEntrance/${id}`, {
  //       ...data,
  //       'carParkId':selCarPark,
  //       'carType':selType,
  //       'entranceDevices':dev,
  //       'fromZoneId':selFrom,
  //       'id':id,
  //       'lastCarPlate':selPlate,
  //       'lastOctopusNumber':selOctopus,
  //       'name':carParkName,
  //       'status':selStatus,
  //       'toZoneId':selTo,
  //     }, {
  //         headers:{
  //           'Authorization':token,
  //           'ORGID':orgID,
  //         }
  //     });
  //     result.then((res) => {
  //       setContent('Record Save')
  //       setVisible(true);
  //     }).catch((err) => {
  //       console.log("error: ", err);
  //     })
  //   }
  //   else {
  //     var result = axios.post(`${REACT_APP_APIURL}CarEntrance`,{
  //       'carParkId':selCarPark,
  //       'carType':selType,
  //       'entranceDevices':dev,
  //       'fromZoneId':selFrom,
  //       'id':id,
  //       'lastCarPlate':selPlate,
  //       'lastOctopusNumber':selOctopus,
  //       'name':carParkName,
  //       'status':selStatus,
  //       'toZoneId':selTo,
  //       'appInstanceId':"string",
  //       'currentEntranceRecordId':"string",
  //     },{
  //       headers:{
  //         'Authorization':token,
  //         'ORGID':orgID,
  //       }
  //     });
  //     result.then((res) => {
  //       setContent('Record save');
  //       setVisible(true);
  //       setTimeout(() => {
  //         router.push(`/entrance/car-entrance/${res.data.id}`);
  //       },5000);
  //     }).catch((err) => {
  //       console.log("error: ", err);
  //     })
  //   }
  // }
  const SaveItem = () => {
    setVisible(true);

  }
  const handleChange =(e:any) =>{
    console.log("name changed", e.target.value);
    switch (e.target.id) {
      case 'name':
      setCarParkName(e.target.value);
      break;
      case 'selectCarPark':
      setSelCarPark(e.target.value);
      break;
      case 'selectFrom':
      setSelFrom(e.target.value);
      break;
      case 'selectTo':
      setSelTo(e.target.value);
      break;
      case 'selectStatus':
      setSelStatus(e.target.value);
      break;
      // case 'selectDevice':
      // setSel(e.target.value);
      // break;
      case 'selectType':
        setSelType(e.target.value);
      break;   
      case 'plate':
        setSelPlate(e.target.value);
        break;
      case 'number':
        setSelOctopus(e.target.value);   
        break;
    default:

        break;
    }
  }
  const [visible, setVisible] = useState(false);
  const AddItem = () => {
    console.log("button clicked");
    var temp = [];
    if(dev.length > 0){
      for(var i=0; i< dev.length; i++){
        temp.push(dev[i]);
      }
      temp.push(dev[0]);
      setDev(temp);
    }
    else setDev(devT[0]);

  }
  const handleClick = (e:any) => {
    console.log("mouse clicked:", e.target.id);
    var id = e.target.id;
    var temp = [];
    if(dev.length > 1){
      for(var i=0; i< dev.length; i++){
      if(id == i.toString()) continue;
      temp.push(dev[i]);
      }
      setDev(temp);
    }
    
  }
  const DelItem =() => {
    setDanger(true);
}

const Confirm =() => {
  console.log("OrgId: ", orgID);
  console.log("delete: ");
  if(id!==RAND_ID){
    var result = axios.delete(`${REACT_APP_APIURL}CarEntrance/${id}`, {
      headers:{
        'Authorization':token,
        'ORGID':orgID,
      }
    })
    result.then((res) => {
        console.log("success delete", res.data.id);
        setContent('Record Delete')
        setVisible(true);
        setTimeout(() => {
          router.push('/entrance/car-entrance/');
        }, 5000);

    }).catch((err) => {
      console.log("error: ", err);
    })
  }
}

const Cancel = () => {
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
        :''
      }
      <CCardHeader className={styles.cardHeader}>
      CarEntrance
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
          <div className="row float-right" style={{width:'60%'}}>
            <div className="col-sm-12">
              <h5>Car Entrance Information</h5>
                  <CFormGroup className="row">
                    <div className="col-md-2">
                        <CLabel htmlFor="name" className={styles.custom_label}>Name</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px',marginBottom:'15px'}}>
                      <CInput 
                        className="is-valid"
                        type="string"
                        id="name"
                        name="name"
                        placeholder="name"
                        autoComplete="given-name"
                        required
                        onChange={(e) =>handleChange(e)}
                        value={carParkName}
                        />
                    </div>
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">Input provided</CValidFeedback>

                      

                    <div className="col-md-2" >
                      <CLabel className={styles.custom_label} htmlFor="name">Car Park</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px'}}>
                          <CSelect name="select" id="selectCarPark" value={selCarPark || ''}  onChange={(e) =>handleChange(e)}
>
                          {carPark.map((item, index) =>{
                               return(
                                <option key={index} value={item.id} >{item.name}</option>
                               )
                             } )}
                        </CSelect>
                    </div>

                    <div className="col-md-2">
                      <CLabel className={styles.custom_label}  htmlFor="name">From Zone</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px'}}>
                          <CSelect name="select" id="selectFrom" value={selFrom || ''} onChange={(e) =>handleChange(e)}>
                          {parkingZone.map((item, index) =>{
                               return(
                                <option key={index} value={item.id} >{item.name}</option>
                               )
                             } )}
                        </CSelect>
                    </div>
                    <div className="col-md-2">
                      <CLabel className={styles.custom_label} htmlFor="name">To Zone</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px'}}>
                          <CSelect name="select" id="selectTo" value={selTo || ''} onChange={(e) =>handleChange(e)}>
                            {parkingZone.map((item, index) =>{
                                return(
                                  <option key={index} value={item.id} >{item.name}</option>
                                )
                              } )}
                        </CSelect>
                    </div>

                    <div className="col-md-2">
                      <CLabel className={styles.custom_label} htmlFor="name">Car Type</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px'}}>
                          <CSelect name="selectCar" id="selectType" onChange={(e) =>handleChange(e)} value={selType.toString() || ''}>
                            <option value=""></option>
                            <option value="0">Truck</option>
                            <option value="1">Motorcycle</option>
                            <option value="2">EV</option>
                            <option value="3">Disabled</option>
                            <option value="4">Private Car</option>

                        </CSelect>
                    </div>

                    <div className="col-md-2" >
                      <CLabel className={styles.custom_label} htmlFor="name">Status</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px'}} >
                          <CSelect name="selectStatus" id="selectStatus" value={selStatus.toString() || ''} onChange={(e) =>handleChange(e)}> 
                            <option value=""></option>
                            <option value="0">Ready</option>
                            <option value="1">Pending</option>
                            <option value="2">Wait For Payment</option>
                            <option value="3">Gate Open</option>
                        </CSelect>
                    </div>

                    <div className="col-md-2" >
                        <CLabel htmlFor="name" className={styles.custom_label}>Last Car Plate</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px'}}>
                      <CInput 
                        className="is-valid"
                        type="string"
                        id="plate"
                        name="plate"
                        placeholder="name"
                        autoComplete="given-name"
                        required
                        onChange={(e) =>handleChange(e)}
                        value={selPlate}

                        />
                    </div>
                    <div className="col-md-2" >
                        <CLabel htmlFor="name" className={styles.custom_label}>Last Octopus Number</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px',marginBottom:'15px'}}>
                      <CInput 
                        className="is-valid"
                        type="string"
                        id="number"
                        name="plate"
                        placeholder="name"
                        autoComplete="given-name"
                        required
                        onChange={(e) =>handleChange(e)}
                        value={selOctopus}

                        />
                    </div>
                  </CFormGroup>
            </div>

            <div className="col" id="bodyDevice" >
              <h5>Entrance Devices</h5>

              <CButtonToolbar
                className="justify-content-end"
                style ={{paddingBottom:'20px'}}
              >
                <CButton className="btn-primary" onClick={AddItem} >Add</CButton>  
              </CButtonToolbar>
              <div className="divide" />
              {
                dev !==null && dev !==[] ? dev.map((ele:devType, idx:number) =>{
                  return(
                      <div className="row" key={idx}>
                        <div className="col-md-2">
                          <CLabel className={styles.custom_label} htmlFor="name">Connector Device</CLabel>
                        </div>
                        <div className="col-md-9" style={{marginTop:'15px'}}>
                            <CSelect name="selectCar" id="selectDevice" onChange={(e) =>handleChange(e)} value={ele.connectorDeviceId || ''}>
                            {device.map((item, index) =>{
                                return(
                                  <option key={index} value={item.id} >{item.name}</option>
                                )
                              } )}

                          </CSelect>
                        </div>
                        <div className="col-md-1 pt-4"><i className="cil-trash" id={idx.toString()} style={{cursor:'pointer'}} onClick={(e) =>handleClick(e)}></i></div>
                      </div>
                  )
                }):''
              }
              
              
            </div>
          </div>
          <div className="row float-left" style={{width:'40%'}}>
            {
              message.length > 0 && JSON.parse(message).templateId !== 1 ? <div className="col-md-12 mt-2" id="template1">
              <CCard className="border-0">
                <CCardHeader className="m-auto">
                  {/* <h4>name1</h4> */}
                </CCardHeader>
                <CCardBody className=""  style={{border:'15px solid', minHeight:'220px', borderColor: message.length > 0 && JSON.parse(message).templateId == 5? '#F11': '#1C1'}}>
                  <div className="h5 mb-4">
                    <span>{message.length > 0 && JSON.parse(message).messageEN !== null? JSON.parse(message).messageEN:'Please Exit'}</span>
                  </div>
                  <div className="h5 mb-4">
                    <span>{message.length > 0 && JSON.parse(message).messageCN !== null? JSON.parse(message).messageCN:'Chinese letter'}</span>
                  </div>
                  <div>
                    <span>{message.length > 0 && JSON.parse(message).entryTime !== null? (`Enter time: ${JSON.parse(message).entryTime}`) :''}</span>
                  </div>
                  <div>
                    <span>{message.length > 0 && JSON.parse(message).exitTime !== null && JSON.parse(message).exitTime !== undefined? (`Exit time: ${JSON.parse(message).exitTime}`):''}</span>
                  </div>
                  <div>
                    <span>{message.length > 0 && JSON.parse(message).parkingTime !== 0 && JSON.parse(message).parkingTime !== undefined? (`Parking time: ${JSON.parse(message).parkingTime}`):''}</span>
                  </div>
                  <div>
                    <span>{message.length > 0 && JSON.parse(message).octopusData !==null && JSON.parse(message).octopusData !==undefined ? (`RemainedValue: ${JSON.parse(message).octopusData.RemainValue}`):''}</span>
                  </div>
                  <div>
                    <span>{message.length > 0 && JSON.parse(message).estTime !== 0 ? (`Est time: ${JSON.parse(message).estTime}`):''}</span>
                  </div>
                </CCardBody>
              </CCard>
            </div>:<div className="col-12 mt-4"><img src={image} alt='image' style={{width:'99%'}} /></div>
            }
          </div>
        </CForm>
      </CCardBody>
    </CCard>
    </>
  );
};
export default CarEntranceEdit
