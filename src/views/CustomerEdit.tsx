/* eslint-disable */

import React, { useState } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable, CFormGroup, CInvalidFeedback, CValidFeedback, CToaster, CToast, CToastBody, CToastHeader, CTextarea } from '@coreui/react'
import styles from './Style.module.css'
import {usersData} from './components/mockData';
import  ToastComponent  from '../reusable/ToastComponent';

const CustomerEdit = () => {
  console.log("car-park-edit");
  const router = useHistory();
  const BackItem =()=>{
    router.push('/crm/customer/')
  }
  const SaveItem =() =>{
    // router.goBack();
    setVisible(true);
    console.log("clicked");
  }
  const handleChange =(e:any) =>{
    console.log("changed", e.target.value);
  }
  const [visible, setVisible] = useState(false);
  const [userData, setUsersData] = useState(usersData);

  return (
    <CCard>
      {
        visible?
        <ToastComponent />
        :
        ''
      }
      <CCardHeader className={styles.cardHeader}>
      Customer Edit
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
            <CButton className="btn-primary" onClick={SaveItem} >Save</CButton>  

          </CButtonToolbar>
          <div className="row">
            <div className="col-sm-12">
              <h5>Customer Information</h5>

                  <CFormGroup className="row">
                    
                      <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              First Name
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px'}}>
                        <CInput 
                          
                          type="string"
                          id="name"
                          name="name"
                          placeholder="firstName"
                          autoComplete="given-name"
                          required
                          />
                      </div>

                      <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              Last Name
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px'}}>
                        <CInput 
                     
                          type="string"
                          id="name"
                          name="name"
                          placeholder="lastName"
                          autoComplete="given-name"
                          required
                          onChange={(e) =>{
                            handleChange(e)
                          }}
                          />
                      </div>

                      <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              Email
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px'}}>
                        <CInput 
                          className="is-valid"
                          type="string"
                          id="name"
                          name="name"
                          placeholder="email"
                          autoComplete="given-name"
                          required
                          />
                      </div>

                      <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              Phone
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px'}}>
                        <CInput 
                          className="is-valid"
                          type="string"
                          id="name"
                          name="name"
                          placeholder="phone"
                          autoComplete="given-name"
                          required
                          />
                      </div>
                    
                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Remark</CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px'}}>
                        <CTextarea 
                          name="textarea-input" 
                          id="textarea-input" 
                          onChange={(e) =>{
                            handleChange(e)
                          }}
                          
                        />
                      </div>



                      <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              Octopus Number
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px', marginTop:'15px'}}>
                        <CInput 
                          className="is-valid"
                          type="string"
                          id="name"
                          name="name"
                          placeholder="octopusNo"
                          autoComplete="given-name"
                          required
                          onChange={(e) =>{
                            handleChange(e)
                          }}
                          />
                      </div>

                      <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              Car Plate
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px', marginTop:'15px'}}>
                        <CInput 
                          className="is-valid"
                          type="string"
                          id="name"
                          name="name"
                          placeholder="carPlate"
                          autoComplete="given-name"
                          required
                          onChange={(e) =>{
                            handleChange(e)
                          }}
                          />
                      </div>
                  </CFormGroup>
            </div>

          </div>
        </CForm>

      </CCardBody>
    </CCard>
  );
};
export default CustomerEdit
