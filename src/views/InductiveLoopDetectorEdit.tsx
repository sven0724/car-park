/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CForm, CLabel, CInput, CSelect, CFormGroup, CInvalidFeedback, CValidFeedback } from '@coreui/react'
import styles from './Style.module.css'
import  ToastComponent  from '../reusable/ToastComponent';
import { REACT_APP_APIURL } from '../configs/apiConfig';
import axios from 'axios';
import { RAND_ID } from './components/mockData';
import Modal from '../reusable/Modal';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const InductiveLoopDetectorEdit = (props:any) => {

  const router = useHistory();
  const id = props.match.params.id;
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');
  const [content, setContent] = useState('');
  const [danger, setDanger] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState(0);
  const [data, setData] = useState<any>(null);;
  const [visible, setVisible] = useState(false);
  console.log("InductiveLoopDetectorEdit");
  const { oidcUser, logout } = useReactOidc();

  const BackItem = () => {
    router.push('/entrance/inductive-loop-detector/')
  }

  useEffect(() => {
    var result = axios.get(`${REACT_APP_APIURL}InductiveLoopDetector/${id}`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) => {
      console.log("data: ", res.data);
      setData(res.data);
      setName(res.data.name);
      setType(res.data.loopType);
    }).catch((err) => {
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus == 401) logout();
    })

  },[]);

  const SaveItem =() =>{
    if(id!==RAND_ID){
      var result = axios.put(`${REACT_APP_APIURL}InductiveLoopDetector/${id}`, {
        ...data,
        '$type':'string',
        'id':id,
        'name':name,
        'loopType':type,
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
      var result = axios.post(`${REACT_APP_APIURL}InductiveLoopDetector`,{
        'type':'string',
        'connectorGroupId':'string',
        "status":0,
        '$type':'string',
        'id':id,
        'name':name,
        'loopType':type,
      },{
        headers:{
          'Authorization':token,
          'ORGID':orgID,
        }
      });
      result.then((res) => {
        setContent('Record save');
        setVisible(true);
        setTimeout(() => {
          router.push(`/entrance/inductive-loop-detector/${res.data.id}`);
        },5000);
      }).catch((err) => {
        console.log("error: ", err);
      })
    }
  }

  const handleSelect = (e:any) => {
    setType(e.target.value);
  }

  const handleName = (e:any) => {
    setName(e.target.value);
  }

  const DelItem =() =>{
      setDanger(true);
  }

  const Confirm =() =>{
    if(id!==RAND_ID){
      var result = axios.delete(`${REACT_APP_APIURL}InductiveLoopDetector/${id}`, {
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
            router.push('/entrance/inductive-loop-detector/');
          }, 5000);

      }).catch((err) =>{
        console.log("error: ", err);
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
      Inductive Loop Detector
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
              <h5>Inductive Loop Detector Information</h5>
                  <CFormGroup className="row">
                  <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              Name
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px', marginTop:'15px'}}>
                        <CInput 
                          type="string"
                          id="name"
                          name="name"
                          placeholder="name"
                          autoComplete="given-name"
                          required
                          value={name}
                          onChange={(e) =>handleName(e)}
                          />
                      </div>
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">Input provided</CValidFeedback>

                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Loop Type</CLabel>
                      </div>
                      <div className="col-md-10" style={{marginTop:'15px'}} >
                           <CSelect name="select" id="select" onChange={(e)=>handleSelect(e)} value={type}>
                             <option value="0">Default</option>
                             <option value="1">Front</option>
                             <option value="2">Rear</option>
                          </CSelect>
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
export default InductiveLoopDetectorEdit
