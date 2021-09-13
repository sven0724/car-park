import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from "@coreui/react"
import React, { useState } from "react"

const Modal = (props:any) =>{

    const [danger, setDanger] = useState(props.show)
    const handleClick = () => {
        props.handleConfirm();
        setDanger(false)
    }
    const handleCancel =() => {
        props.handleCancel();
    }
    return(
    <CModal 
        show={danger} 
        onClose={() => setDanger(!danger)}
        color="danger"
    >
        <CModalHeader closeButton>
            <CModalTitle>Delete Record</CModalTitle>
            </CModalHeader>
            <CModalBody>
                This will permenately delete the record.
            </CModalBody>
            <CModalFooter>
            <CButton color="danger" onClick={handleClick}>Confirm</CButton>{' '}
            <CButton color="secondary" onClick={handleCancel}>Cancel</CButton>
        </CModalFooter>
    </CModal>
    )

}
export default Modal
