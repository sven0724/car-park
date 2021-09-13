/* eslint-disable */

import React, { useState, useEffect } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CForm, CLabel, CInput, CFormGroup, CInvalidFeedback, CValidFeedback } from '@coreui/react'
import styles from './Style.module.css'
import  ToastComponent  from '../reusable/ToastComponent';
import axios from 'axios';
import { REACT_APP_APIURL } from '../configs/apiConfig';
import Modal from '../reusable/Modal';
import { RAND_ID } from './components/mockData';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const BarrierGateEdit = (props:any) => {
  const id = props.match.params.id;
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');
  const [content, setContent] = useState('');
  const [danger, setDanger] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [pulse, setPulse] = useState(0);
  const [data, setData] = useState<any>(null);
  const { logout } = useReactOidc();

  console.log("id:", id);
  console.log("car-park-edit");
  const router = useHistory();

  useEffect(() => {
    var result = axios.get(`${REACT_APP_APIURL}BarrierGate/${id}`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) =>{
      console.log("data: ", res.data);
      setName(res.data.name);
      setPulse(res.data.pulseWidth);
      setData(res.data);
    }).catch((err) =>{
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus === 401) logout();
    });  
  }, [])
  const BackItem =()=>{
    router.push('/entrance/barrier-gate/')
  }
  const SaveItem =() =>{
    if(id!==RAND_ID){
      var result = axios.put(`${REACT_APP_APIURL}BarrierGate/${id}`, {
        ...data,
        'id':id,
        'name':name,
        'pulseWidth':pulse,
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
      var Newresult = axios.post(`${REACT_APP_APIURL}BarrierGate`,{
        'id':id,
        'name':name,
        'pulseWidth':pulse,
          '$type':'string',
          'type':'string',
          "connectorGroupId":'string',
          'status':0,

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
          router.push(`/entrance/barrier-gate/${res.data.id}`);
        },5000);
      }).catch((err) => {
        console.log("error: ", err);
      })
    }
  }
  const handleWidth =(e:any) =>{
    setPulse(e.target.value);
  }
  const handleName =(e:any) =>{
    setName(e.target.value);
  }
  const DelItem =() =>{
    setDanger(true);
  }
  const Confirm =() =>{
    if(id!==RAND_ID){
      var result = axios.delete(`${REACT_APP_APIURL}BarrierGate/${id}`, {
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
            router.push('/entrance/barrier-gate/');
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
      Barrier Gate
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
              <h5>Barrier Gate Information</h5>
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
                          onChange={(e) =>handleName(e)}
                          value={name}
                          />
                      </div>
                    
                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Pulse Information</CLabel>
                      </div>

                      <div className="col-md-10" style={{marginTop:'15px'}}>
                        <CInput 
                          className="is-valid"
                          type="number"
                          id="pulseWidth"
                          name="pulseWidth"
                          placeholder="pulseWidth"
                          autoComplete="given-name"
                          required
                          onChange={(e:any) =>handleWidth(e)}
                          value={pulse}
                          />
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
export default BarrierGateEdit
