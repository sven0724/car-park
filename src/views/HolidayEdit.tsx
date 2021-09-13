/* eslint-disable */

import React, { useState } from 'react'

import { useHistory} from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButtonToolbar, CButton, CRow, CForm, CLabel, CInput, CSelect, CNav, CDataTable, CFormGroup, CInvalidFeedback, CValidFeedback, CToaster, CToast, CToastBody, CToastHeader } from '@coreui/react'
import styles from './Style.module.css'
import  ToastComponent  from '../reusable/ToastComponent';

const HolidayEdit = (props:any) => {
  console.log("match--------->", props.match.params.id );
  const id = props.match.params.id;
  const router = useHistory();
  const BackItem =()=>{
    router.push('/common/holiday/')
  }
  const SaveItem =() =>{
    setVisible(true);
    console.log("clicked");
  }
  const handleChange =(e:any) =>{
    console.log("changed", e.target.value);
  }
  const [visible, setVisible] = useState(false);

  return (
    <CCard>
      {
        visible?
        <ToastComponent />
        :''
      }
      <CCardHeader className={styles.cardHeader}>
      Holiday Edit
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
              <h5>Holiday Information</h5>
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
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">Input provided</CValidFeedback>

                      <div className="col-md-2">
                      <CLabel 
                        className={styles.custom_label}
                        htmlFor="name">
                          Date
                      </CLabel>
                      </div>

                      <div className="col-md-10" style={{marginBottom:'15px', marginTop:'15px'}}>
                        
                          <CInput type="date" id="date-input" name="date-input" onChange={(e) =>handleChange(e)}   />
                      </div>


                  </CFormGroup>
            </div>

          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
export default HolidayEdit
