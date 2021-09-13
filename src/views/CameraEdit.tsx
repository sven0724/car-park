/* eslint-disable */

import React, { useEffect, useState } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CForm, CLabel, CInput, CFormGroup, CInvalidFeedback, CValidFeedback } from '@coreui/react'
import styles from './Style.module.css'
import  ToastComponent  from '../reusable/ToastComponent';
import { REACT_APP_APIURL } from '../configs/apiConfig';
import axios from 'axios';
import { RAND_ID } from './components/mockData';
import Modal from '../reusable/Modal';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const CameraEdit = (props:any) => {
  const id = props.match.params.id;
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');
  const [content, setContent] = useState('');
  const [danger, setDanger] = useState(false);
  const [data, setData] = useState<any>(null);;
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [lastResonse, setLastResonse] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [visible, setVisible] = useState(false);
  const { logout } = useReactOidc();

  console.log("cameraEdit");
  const router = useHistory();
  useEffect(() => {
    var result = axios.get(`${REACT_APP_APIURL}Camera/${id}`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) =>{
      console.log("data: ", res.data);

      if(res.data.lastCarPlate == null)
        res.data.lastCarPlate = '';
      if(res.data.lastResponseTime == null){
        res.data.lastResponseTime = '2021-01-01 00:00:00';
        setDate(res.data.lastResponseTime.split(' ')[0]);
        setTime(res.data.lastResponseTime.split(' ')[1]);
      }
      else{
        setDate(res.data.lastResponseTime.split('T')[0]);
        if(res.data.lastResponseTime.includes('.')){
          setTime(res.data.lastResponseTime.split('T')[1].split('.')[0]);
        }else{
          setTime(res.data.lastResponseTime.split('T')[1].split(res.data.lastResponseTime.split('T')[1].substr(-1))[0]);
        }
      }
      setData(res.data);
      setName(res.data.name);
      setIp(res.data.ipAddress);
      setLastResonse(res.data.lastResponseTime);
      
 
    }).catch((err) =>{
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus === 401) logout();
    });  
  }, [])
  const BackItem =()=>{
    router.push('/entrance/camera/')
  }
  const SaveItem =() =>{
    if(id!==RAND_ID){
      var result = axios.put(`${REACT_APP_APIURL}Camera/${id}`, {
        ...data,
        '$type':'string',
        'id':id,
        'name':name,
        'ipAddress':ip,
        'lastCarPlate':carPlate,
        'lastResponseTime': lastResonse,
      }, {
          headers:{
            'Authorization':token,
            'ORGID':orgID,
          }
      });
      result.then((res) =>{
        setContent('Record Save')
        setVisible(true);
      }).catch((err) =>{
        console.log("error: ", err);
      })
    }
    else {
      var Newresult = axios.post(`${REACT_APP_APIURL}Camera`,{
        'type':'string',
        'connectorGroupId':'string',
        "status":0,
        '$type':'string',
        'id':id,
        'name':name,
        'ipAddress':ip,
        'lastCarPlate':carPlate,
        'lastResponseTime': lastResonse,

      },{
        headers:{
          'Authorization':token,
          'ORGID':orgID,
        }
      });
      Newresult.then((res) => {
        setContent('Record save');
        setVisible(true);
        setTimeout(() => {
          router.push(`/entrance/camera/${res.data.id}`);
        },5000);
      }).catch((err) => {
        console.log("error: ", err);
      })
    }
  }

  const handleChangeIp = (e:any) => {
    console.log("variable->", e.target.value);
    setIp(e.target.value)
  }
  const handleChangeName = (e:any) => {
    console.log("variable->", e.target.value);
    setName(e.target.value);
  }
  const handleChangeCar = (e:any) => {
    console.log("variable->", e.target.value);
    setCarPlate(e.target.value);
  }
  const handleChangeDate = (e:any) => {
    console.log("variable->", e.target.value);
    setDate(e.target.value);
    var tempResponse = e.target.value + 'T' + time;
    setLastResonse(tempResponse);
  }
  const handleChangeTime = (e:any) => {
    console.log("variable->", e.target.value);
    setTime(e.target.value);
    var tempResponse = date + 'T' + time;
    setLastResonse(tempResponse);

  }

  const DelItem =() =>{
    setDanger(true);
  }
  const Confirm =() =>{
    if(id!==RAND_ID){
      var result = axios.delete(`${REACT_APP_APIURL}Camera/${id}`, {
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
            router.push('/entrance/camera/');
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
        :''
      }
      <CCardHeader className={styles.cardHeader}>
      Camera
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
              <h5>Camera Information</h5>
                  <CFormGroup className="row">
                  <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              Name
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px'}}>
                        <CInput 
                          className="is-valid"
                          type="string"
                          id="name"
                          name="name"
                          placeholder="name"
                          autoComplete="given-name"
                          required
                          value={name}
                          onChange={(e:any) =>handleChangeName(e)}
                          />
                      </div>
                    
                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">ipAddress</CLabel>
                      </div>

                      <div className="col-md-10" style={{marginTop:'15px', marginBottom:'15px'}}>
                        <CInput 
                          className="is-valid"
                          type="string"
                          id="ipAddress"
                          name="ipAddress"
                          placeholder="ipAddress"
                          autoComplete="given-name"
                          required
                          value={ip}
                          onChange={(e:any) =>handleChangeIp(e)}
                          />
                      </div>
                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">lastCarPlate</CLabel>
                      </div>

                      <div className="col-md-10" style={{marginTop:'15px', marginBottom:'15px'}}>
                        <CInput 
                          className="is-valid"
                          type="string"
                          id="lastCarPlate"
                          name="lastCarPlate"
                          placeholder="lastCarPlate"
                          autoComplete="given-name"
                          required
                          value={carPlate}
                          onChange={(e:any) =>handleChangeCar(e)}
                          // value=''
                          />
                      </div>

                      <div className="col-md-2">
                        <CLabel htmlFor="name" className={styles.custom_label}>Last Response Time</CLabel>
                      </div>
                      <div className="col-md-5" style={{marginTop:'15px'}}> 
                        <CInput type="date" id="date-input" name="date-input" placeholder="date" value={date} onChange={(e:any) =>handleChangeDate(e)}/>

                      </div>
                      <div className="col-md-5" style={{marginTop:'15px'}}> 
                        <CInput type="time" id="time-input" name="date-input" placeholder="time" value={time} onChange={(e:any) =>handleChangeTime(e)}/>

                      </div>
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">Input provided</CValidFeedback>
                  </CFormGroup>
            </div>

          </div>
        </CForm>
 

      </CCardBody>
    </CCard>
    </>
  );
};
export default CameraEdit
