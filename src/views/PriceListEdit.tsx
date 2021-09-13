/* eslint-disable */

import React, { useState } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable, CFormGroup, CInvalidFeedback, CValidFeedback, CToaster, CToast, CToastBody, CToastHeader } from '@coreui/react'
import styles from './Style.module.css'
import {usersData} from './components/mockData';
import  ToastComponent  from '../reusable/ToastComponent';

const PriceListEdit = () => {
  console.log("car-park-edit");
  const router = useHistory();
  const BackItem =()=>{
    router.push('/payment/price-list/')
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
      Price List Edit
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
              <h5>Price List Information</h5>

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
                          className="is-valid"
                          type="string"
                          id="name"
                          name="name"
                          placeholder="name"
                          autoComplete="given-name"
                          required
                          onChange={(e) =>handleChange(e)}
                          />
                      </div>
                    
                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Car Park</CLabel>
                      </div>
                      <div className="col-md-10" style={{marginTop:'15px', marginBottom:'15px'}} onChange={(e) =>handleChange(e)}>
                           <CSelect name="select" id="select">
                             <option key='a' value="2">Timed Type</option>
                             <option key='ab' value="2b">Discrete</option>
                                   
                          </CSelect>
                      </div>

                      <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              freeParkingTime
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px', marginTop:'15px'}}>
                        <CInput 
                          className="is-valid"
                          type="number"
                          id="name"
                          name="name"
                          placeholder="freeParkingTime"
                          autoComplete="given-name"
                          required
                          onChange={(e) =>handleChange(e)}
                          />
                      </div>

                      <div className="col-md-2">
                          <CLabel 
                            className={styles.custom_label}
                            htmlFor="name">
                              TimeInterval
                          </CLabel>
                      </div>
                      <div className="col-md-10" style={{marginBottom:'15px', marginTop:'15px'}}>
                        <CInput 
                          className="is-valid"
                          type="number"
                          id="name"
                          name="name"
                          placeholder="timeInterval"
                          autoComplete="given-name"
                          required
                          onChange={(e) =>handleChange(e)}
                          />
                      </div>


                  </CFormGroup>
            </div>
            <div className="col" id="bodyDevice" >
              <h5>Timed Type Price List Items</h5>

              <CButtonToolbar
                className="justify-content-end"
                style ={{paddingBottom:'20px'}}
              >
                <CButton className="btn-primary" onClick={SaveItem} >Add</CButton>  
              </CButtonToolbar>

            </div>
          </div>
        </CForm>

      </CCardBody>
    </CCard>
  );
};
export default PriceListEdit
