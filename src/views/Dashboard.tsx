/* eslint-disable */

import { Counter }  from './components/Counter';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import styles from './Style.module.css'

import {REACT_APP_APIURL, REACT_AUTHORITY_URL, carId, pagesize} from '../../src/configs/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../reusable/Loading';
import { CCard, CCardHeader, CCardBody, CForm, CButtonToolbar, CButton, CFormGroup, CLabel, CInput, CDataTable, CInvalidFeedback, CValidFeedback } from '@coreui/react';
import ToastComponent from '../reusable/ToastComponent';
// import { useParams } from 'react-router-dom';
// import { useServerTimeHub } from '../services/server-time-hub';
// import { RAND_ID } from './components/mockData';

const Dashboard = (props:any) => {
  const [loading, setLoading] = useState(true)
  const { oidcUser, logout, events } = useReactOidc();
  const token = sessionStorage.getItem('token');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [total1, setTotal1] = useState(0);
  const [remain1, setRemain1] = useState(0);
  const [reserved1, setReserved1] = useState(0);
  const [used1, setUsed1] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [remain2, setRemain2] = useState(0);
  const [reserved2, setReserved2] = useState(0);
  const [used2, setUsed2] = useState(0);
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');
  const [flag, setFlag] = useState(false);
  const [items, setItems] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [deviceInfo2, setDeviceInfo2] = useState<any>(null);
  const [carParkId, setCarParkId] = useState(carId);
  const [pageSize, setPageSize] = useState(pagesize);

  const fields = [
    { key: 'statusTime', label: 'StatusDateTime', _style: { width: '25%'} },
    { key: 'entranceName', label: 'Name', _style: { width: '15%'} },
    { key: 'octopusNumber', label: 'Octopus Number', _style: { width: '20%'} },
    { key: 'status', label: 'Status', _style: { width: '20%'} },
  ]; 

 

  useEffect(() => {

    var result = axios.get(`${REACT_AUTHORITY_URL}Organization/ClientId/car-park-system`, {
      headers:{
        'Authorization':token
      }
    })
    result.then((res) =>{
      sessionStorage.setItem('ORGID', res.data[0].id);
      setLoading(false);
      console.log("ORGID", res.data[0].id);
    }).catch((err) =>{
      console.log("error: ", err);
      if(err.response !== undefined ) {
        var errStatus = err.response.status;
        if( errStatus == 401) logout();
      }

    })
 
    var result = axios.get(`${REACT_APP_APIURL}CarPark/AvailableSpaces?id=${carParkId}`, {
      headers:{
        'Authorization':token,
        'ORGID':sessionStorage.getItem('ORGID'),
      }
    });
    result.then((res) =>{
      console.log(res.data);
      setId1(res.data[0].parkingZoneId);
      setId2(res.data[1].parkingZoneId);
      setName1(res.data[0].parkingZoneName);
      setName2(res.data[1].parkingZoneName);
      setTotal1(res.data[0].totalParkingSpaces);
      setTotal2(res.data[1].totalParkingSpaces);
      setRemain1(res.data[0].remainParkingSpace);
      setRemain2(res.data[1].remainParkingSpace);
      setReserved1(res.data[0].reservedParkingSpace);
      setReserved2(res.data[1].reservedParkingSpace);
      setUsed1(res.data[0].usedParkingSpace);
      setUsed2(res.data[1].usedParkingSpace);

      var result1 = axios.get(`${REACT_APP_APIURL}ParkingZone/GetParkingZoneDeviceInfo?id=${res.data[0].parkingZoneId}`, {
        headers:{
          'Authorization':token,
          'ORGID':sessionStorage.getItem('ORGID'),
        }
        });
      result1.then((res) =>{
        console.log("response arrived: ", res.data);
        for (var i = 0; i< res.data.entrance.length; i++){
          for ( var j = 0; j<res.data.entrance[i].connectorDevices.length; j++){
            switch (res.data.entrance[i].connectorDevices[j].deviceStatus) {
              case -1:
                res.data.entrance[i].connectorDevices[j].deviceStatus = 'connector disconnected';
                break;
              case 0:
                if(j ==2 || j ==4){
                  res.data.entrance[i].connectorDevices[j].deviceStatus = 'connector connected';
                }else{
                  res.data.entrance[i].connectorDevices[j].deviceStatus = 'OFF';
                }
                break;
              case 1:
                if(j !=2 && j !=4){
                  res.data.entrance[i].connectorDevices[j].deviceStatus = 'ON';
                }
                break;
            }
          }
        }
      
        setDeviceInfo(res.data);
        console.log("deviceInfo: ", res.data);
        // console.log("ddd: ", res.data.entrance[1].connectorDevices);
      }).catch((err) =>{
        console.log("error: ", err);
      })
      var result2 = axios.get(`${REACT_APP_APIURL}ParkingZone/GetParkingZoneDeviceInfo?id=${res.data[1].parkingZoneId}`, {
        headers:{
          'Authorization':token,
          'ORGID':sessionStorage.getItem('ORGID'),
        }
      });
      result2.then((res) =>{
        console.log("response arrived: ", res.data);
        for (var i = 0; i< res.data.entrance.length; i++){
          for ( var j = 0; j<res.data.entrance[i].connectorDevices.length; j++){
            switch (res.data.entrance[i].connectorDevices[j].deviceStatus) {
              case -1:
                res.data.entrance[i].connectorDevices[j].deviceStatus = 'connector disconnected';
                break;
              case 0:
                if(j ==2 || j ==4){
                  res.data.entrance[i].connectorDevices[j].deviceStatus = 'connector connected';
                }else{
                  res.data.entrance[i].connectorDevices[j].deviceStatus = 'OFF';
                }
                break;
              case 1:
                if(j !=2 && j !=4){
                  res.data.entrance[i].connectorDevices[j].deviceStatus = 'ON';
                }
                break;
            }
          }
        }
        
        setDeviceInfo2(res.data);
        console.log("deviceInfo2: ", res.data);
      }).catch((err) =>{
        console.log("error------->", err);
        var errStatus = err.response.status;
        if(errStatus == 401) logout();
      })


    }).catch((err) =>{
      console.log("error------->", err);
      var errStatus = err.response.status;
      if(errStatus == 401) logout();
    })


    var result = axios.get(`${REACT_APP_APIURL}CarEntranceHistory?pageSize=${pageSize}&orderBy=statusTime%20desc`, {
      headers:{
        'Authorization':token,
        'ORGID':sessionStorage.getItem('ORGID'),
      }
    });
    result.then((res) =>{
      setFlag(true);

      for(var i =0; i<res.data.data.length;i++){
        switch (res.data.data[i].status) {
          case 0:
            res.data.data[i].status = "ready to entry/exit"
            break;
          case 1:
            res.data.data[i].status = "Polling"
            break;
          case 2:
            res.data.data[i].status = "Octopus Success"
            break; 
          case 3:
            res.data.data[i].status = "Octopus Fail"
            break;    
          case 4:
            res.data.data[i].status = "Gate Open"
            break;   
          case 5:
            res.data.data[i].status = "Car Entered/Exited"
            break;  
          case 6:
            res.data.data[i].status = "Manual Open"
            break;            
          default:
            break;
        }
        
        console.log("covert before: ", res.data.data[i].statusTime);
        console.log("result converted: ", convertTZ(res.data.data[i].statusTime, 'UTC+8'));
        res.data.data[i].statusTime = convertTZ(res.data.data[i].statusTime, 'UTC+8');
      }
      console.log("res.data.data: ", res.data.data);
      for (var i = 0; i< res.data.data.length; i++) {
        if(res.data.data[i].octopusNumber ===null ) res.data.data[i].octopusNumber ='';
        if(res.data.data[i].entranceName ===null) res.data.data[i].entranceName= '';
        res.data.data[i].statusTime = res.data.data[i].statusTime.split('T')[0] + ' ' + res.data.data[i].statusTime.split('T')[1].split('.')[0];
      }
      setItems(res.data.data)
      console.log("EntranceRecord: ", res.data);
    }).catch((err) =>{
      console.log("error------->", err);
    })
  }, [])

  const handleChange = (e:any) => {
    console.log("page changed: ", e);
    var cnt = (parseInt(pageSize)/e).toString();
    console.log("cnt: ", cnt);
    var result = axios.get(`${REACT_APP_APIURL}CarEntranceHistory?pageSize=${cnt}`, {
      headers:{
        'Authorization':token,
        'ORGID':sessionStorage.getItem('ORGID'),
        'orderBy':'statusTime desc',
      }
    });
    result.then((res) => {
      console.log("data: ", res.data);
      for(var i =0; i<res.data.data.length;i++){
        switch (res.data.data[i].status) {
          case 0:
            res.data.data[i].status = "ready to entry/exit"
            break;
          case 1:
            res.data.data[i].status = "Polling"
            break;
          case 2:
            res.data.data[i].status = "Octopus Success"
            break; 
          case 3:
            res.data.data[i].status = "Octopus Fail"
            break;    
          case 4:
            res.data.data[i].status = "Gate Open"
            break;   
          case 5:
            res.data.data[i].status = "Car Entered/Exited"
            break;  
          case 6:
            res.data.data[i].status = "Manual Open"
            break;            
          default:
            break;
        }
        res.data.data[i].statusTime = convertTZ(res.data.data[i].statusTime, 'UTC+8');
      }
    })
    .catch((err) =>{
      console.log("error: ", err);
    })

  }
  function convertTZ(date:any, tzString:String) {
    if(tzString.substr(3,1) == '+') tzString = 'UTC' + '-' + tzString.substr(4);
    else tzString = 'UTC' + '+' + tzString.substr(4);
    var inputDate = new Date(date).toUTCString();
    var tempDate = inputDate + ' ' + tzString;
    var result = new Date(tempDate).toISOString();
    return result.substr(0, result.length-1)
  }
  return (
    <>{loading === false ? 
      (    
        <CCard>
          <CCardBody >
            <CForm 
              wasValidated={false}
              action="" method="post"
            >
              
             <div className="row">
                <div className="col-sm-12">
                  <CFormGroup className="row">
                    <div className="col-md-2 m-0 pl-lg-5 pr-0">
                        <h4 className="mt-3">Server Time: </h4>

                    </div>
                    <div className="col-md-2 p-0">
                          <h4 className="mt-3">Response Time: </h4>
                    </div>
                    <div className="col-md-4">
                      <CCard className="border-0">
                        <CCardHeader className="m-auto">
                          <h4>{name1}</h4>
                        </CCardHeader>
                        <CCardBody className="border-dark" style={{background:'yellow', borderRadius:'10px'}}>
                        <div>
                           <span>Parking Zone Name: {name1}</span>
                         </div>
                         <div>
                           <span>Total number of park space: {total1}</span>
                         </div>
                         <div>
                           <span>Used number of park space: {used1}</span>
                         </div>
                         <div>
                           <span>Remained number of park space: {remain1}</span>
                         </div>
                        </CCardBody>
                      </CCard>
                    </div>
                    <div className="col-md-4">
                      <CCard className="border-0">
                        <CCardHeader className="m-auto">
                            <h4>{name2}</h4>
                        </CCardHeader>
                        <CCardBody className="border-dark" style={{background:'yellow', borderRadius:'10px'}}>
                        <div>
                           <span>Parking Zone Name: {name2}</span>
                         </div>
                         <div>
                           <span>Total number of park space: {total2}</span>
                         </div>
                         <div>
                           <span>Used number of park space: {used2}</span>
                         </div>
                         <div>
                           <span>Remained number of park space: {remain2}</span>
                         </div>
                        </CCardBody>
                      </CCard>
                    </div>
                    <div className="col-md-6">
                      <CCard className="border-0">
                        <CCardHeader className="m-auto">
                            <h4>{name1}</h4>
                        </CCardHeader>
                        <CCardBody className="border-dark d-flex"  style={{background:'yellow', borderRadius:'10px'}}>
                          <div className="m-auto p-3">
                            <div>
                              <span>Entry</span>
                            </div>
                            <div>
                              <span>Gate Name: {deviceInfo !==null? deviceInfo.entrance[0].entranceName:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[0].connectorDevices[0].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[0].connectorDevices[0].deviceStatus:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[0].connectorDevices[1].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[0].connectorDevices[1].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[0].connectorDevices[3].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[0].connectorDevices[3].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[0].connectorDevices[4].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[0].connectorDevices[4].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[0].connectorDevices[5].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[0].connectorDevices[5].deviceStatus:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[0].connectorDevices[2].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[0].connectorDevices[2].deviceStatus:''}</span>
                            </div>
                          </div>
                          <div className="m-auto p-3">
                          <div>
                              <span>Entry</span>
                            </div>
                            <div>
                              <span>Gate Name: {deviceInfo !==null? deviceInfo.entrance[1].entranceName:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[1].connectorDevices[0].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[1].connectorDevices[0].deviceStatus:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[1].connectorDevices[1].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[1].connectorDevices[1].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[1].connectorDevices[3].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[1].connectorDevices[3].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[1].connectorDevices[4].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[1].connectorDevices[4].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[1].connectorDevices[5].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[1].connectorDevices[5].deviceStatus:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo !==null ? deviceInfo.entrance[1].connectorDevices[2].deviceName + ':':''}{' '}{deviceInfo !==null? deviceInfo.entrance[1].connectorDevices[2].deviceStatus:''}</span>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </div>

                    <div className="col-md-6">
                      <CCard className="border-0">
                        <CCardHeader className="m-auto">
                            <h4>{name2}</h4>
                        </CCardHeader>
                        <CCardBody className="border-dark d-flex"  style={{background:'yellow', borderRadius:'10px'}}>
                          <div className="m-auto  p-3">
                            <div>
                              <span>Entry</span>
                            </div>
                            <div>
                              <span>Gate Name: {deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].entranceName:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[0].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[0].deviceStatus:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[1].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[1].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[3].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[3].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[4].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[4].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[5].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[5].deviceStatus:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[2].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[2].deviceStatus:''}</span>
                            </div>
                          </div>
                          <div className="m-auto p-3">
                            <div>
                              <span>Exit</span>
                            </div>
                            <div>
                              <span>Gate Name: {deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].entranceName:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[0].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[0].deviceStatus:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[1].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[1].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[3].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[3].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[4].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[4].deviceStatus:''}</span>
                            </div>

                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[5].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[5].deviceStatus:''}</span>
                            </div>
                            <div>
                              <span>{deviceInfo2 !==null && deviceInfo2.entrance.length > 0 ? deviceInfo2.entrance[1].connectorDevices[2].deviceName + ':':''}{' '}{deviceInfo2 !==null && deviceInfo2.entrance.length > 0? deviceInfo2.entrance[1].connectorDevices[2].deviceStatus:''}</span>
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </div>
                    <div className="col-md-12">
                    { flag? 
                      <div className={styles.table}>
                        <CDataTable
                          items={items} 
                          fields={fields}
                          striped
                          itemsPerPageSelect={{label:'Items per page', values:[5, 10, 15, 30]}}
                          itemsPerPage={10}
                          hover
                          sorter
                          pagination
                          footer
                          onPagesChange={(e:any) => handleChange(e)}
                        />
                      </div>
                    : ''
                    }
                    </div>
                  </CFormGroup>
                </div>

              </div>
        </CForm>
      </CCardBody>
    </CCard>
            
            
            
            
            
            )
    
    
    
    
    :(< Loading />)}
    </>
  )
}

export default Dashboard
