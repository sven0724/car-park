/* eslint-disable */

import React, { useState } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable, CFormGroup, CInvalidFeedback, CValidFeedback, CToaster, CToast, CToastBody, CToastHeader, CInputCheckbox } from '@coreui/react'
import styles from './Style.module.css'
import {parkingZoneData, carTypeData} from './components/mockData'
import  ToastComponent  from '../reusable/ToastComponent';

const MonthlyParkingRecordEdit = () => {
  console.log("parking-space-edit");
  const router = useHistory();
  const BackItem =()=>{
    router.push('/report/monthly-parking-record/')
  }
  const SaveItem =() =>{
    // router.goBack();
    setVisible(true);
    console.log("clicked");
  }
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(carTypeData);

  return (
    <CCard>
        {
        visible? 
        <ToastComponent />

        // <CToast 
        //   show={true}
        //   color="red"
        //   autohide={true}
        // />
        :
        ''
      }
      <CCardHeader className={styles.cardHeader}>
      Monthly Parking Record Edit
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
              <h5>Monthly Parking Record Information</h5>
                  <CFormGroup className="row">
                  <div className="col-md-2">
                        <CLabel htmlFor="name">Name</CLabel>
                    </div>
                    <div className="col-md-10">
                      <CInput 
                       
                        type="string"
                        id="name"
                        name="name"
                        placeholder="name"
                        autoComplete="given-name"
                        required
                        />
                    </div>
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">Input provided</CValidFeedback>

                    <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Car Plate</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px'}}>
                      <CInput 
                        className="is-valid"
                        type="string"
                        id="name"
                        name="name"
                        placeholder="carPlate"
                        autoComplete="given-name"
                        required
                        />
                    </div>

                    <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">OctopusNumber</CLabel>
                    </div>
                    <div className="col-md-10" style={{marginTop:'15px'}}>
                      <CInput 
                        className="is-valid"
                        type="string"
                        id="name"
                        name="name"
                        placeholder="octoputNumber"
                        autoComplete="given-name"
                        required
                        />
                    </div>

                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Type</CLabel>
                      </div>
                      <div className="col-md-10" style={{marginTop:'15px'}}>
                           <CSelect name="select" id="select">
                             <option value="1">Truck</option>
                             <option value="2">Motorcycle</option>
                             <option value="3">EV</option>
                             <option value="4">Disabled</option>
                             <option value="5">Private Car</option>

                          </CSelect>
                      </div>

                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Start Time</CLabel>
                      </div>
                      <div className="col-md-5" style={{marginTop:'15px'}}> 
                        <CInput type="date" id="date-input" name="date-input"  />
                      </div>
                      <div className="col-md-5" style={{marginTop:'15px'}}> 
                        <CInput type="time" id="date-input" name="date-input"  />
                      </div>

                      

                      {/* <div className="col-md-5" style={{marginTop:'15px', marginLeft:'20px'}} />  */}
                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">End Time</CLabel>
                      </div>
                      <div className="col-md-5" style={{marginTop:'15px'}}> 
                        <CInput type="date" id="date-input" name="date-input"  />
                      </div>
                      <div className="col-md-5" style={{marginTop:'15px'}}> 
                        <CInput type="time" id="date-input" name="date-input"  />
                      </div>

                      

                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Pay Time</CLabel>
                      </div>
                      <div className="col-md-5" style={{marginTop:'15px'}}> 
                        <CInput type="date" id="date-input" name="date-input"  />
                      </div>
                      <div className="col-md-5" style={{marginTop:'15px'}}> 
                        <CInput type="time" id="date-input" name="date-input"  />
                      </div>

                      <div className="col-md-2">
                        <CLabel className={styles.custom_label} htmlFor="name">Car Park</CLabel>
                      </div>

                      <div className="col-md-10" style={{marginTop:'15px'}}>
                           <CSelect name="select" id="select">
  
                          </CSelect>
                      </div>
                  </CFormGroup>
            </div>

          </div>
        </CForm>
      </CCardBody>
    </CCard>
    
  );
};
export default MonthlyParkingRecordEdit
