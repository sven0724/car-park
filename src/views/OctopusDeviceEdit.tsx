/* eslint-disable */

import React, { useEffect, useState } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable, CFormGroup, CInvalidFeedback, CValidFeedback, CToaster, CToast, CToastBody, CToastHeader } from '@coreui/react'
import styles from './Style.module.css'
import  ToastComponent  from '../reusable/ToastComponent';
import Modal from '../reusable/Modal';
import { REACT_APP_APIURL } from '../configs/apiConfig';
import axios from 'axios';
import { RAND_ID } from './components/mockData';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const OctopusDeviceEdit = (props:any) => {
  console.log("OctopusDeviceEdit");
  const id = props.match.params.id;
  const token = sessionStorage.getItem('token');
  const orgID = sessionStorage.getItem('ORGID');
  const [content, setContent] = useState('');
  const [danger, setDanger] = useState(false);
  const [data, setData] = useState<any>(null);;
  const router = useHistory();
  const [visible, setVisible] = useState(false);
  const [octopusName, setOctopusName] = useState('');
  const { oidcUser, logout } = useReactOidc();

  const BackItem = () => {
    router.push('/entrance/octopus-device/')
  }

  useEffect(() => {
    var result = axios.get(`${REACT_APP_APIURL}OctopusDevice/${id}`, {
      headers:{
        'Authorization': `${token}`,
        'ORGID': orgID
      }
    });
    result.then((res) => {
      console.log("data: ", res.data);
      setData(res.data);
      setOctopusName(res.data.name);
    }).catch((err) => {
      console.log("error: ", err);
      var errStatus = err.response.status;
      if(errStatus == 401) logout();
    })

  },[]);
  const SaveItem = () => {
    if(id!==RAND_ID){
      var result = axios.put(`${REACT_APP_APIURL}OctopusDevice/${id}`, {
        ...data,
        '$type':'string',
        'id':id,
        'name':octopusName,
      }, {
          headers:{
            'Authorization':token,
            'ORGID':orgID,
          }
      });
      result.then((res) => {
        setContent('Record Save')
        setVisible(true);
      }).catch((err) => {
        console.log("error: ", err);
      })
    }
    else {
      var result = axios.post(`${REACT_APP_APIURL}OctopusDevice`,{
        'type':'string',
        'connectorGroupId':'string',
        "status":0,
        '$type':'string',
        'id':id,
        'name':octopusName,
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
          router.push(`/entrance/octopus-device/${res.data.id}`);
        },5000);
      }).catch((err) => {
        console.log("error: ", err);
      })
    }
  }

  const handleName = (e:any) => {
    setOctopusName(e.target.value);
  }

  const DelItem =() => {
    setDanger(true);
}

const Confirm =() => {
  if(id!==RAND_ID){
    var result = axios.delete(`${REACT_APP_APIURL}OctopusDevice/${id}`, {
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
          router.push('/entrance/octopus-device/');
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
      Octopus Device
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
              <h5>Octopus Device Information</h5>
                  <CFormGroup className="row">
                    <div className="col-md-2">
                        <CLabel htmlFor="name" className={styles.custom_label}>Name</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginBottom:'15px', marginTop:'15px'}}>
                      <CInput 
                        className="is-valid"
                        type="string"
                        id="name"
                        name="name"
                        placeholder="name"
                        autoComplete="given-name"
                        required
                        value={octopusName}
                        onChange={(e) =>handleName(e)}
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
export default OctopusDeviceEdit
