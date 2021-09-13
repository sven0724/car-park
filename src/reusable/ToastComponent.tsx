import { CToaster, CToast, CToastHeader, CToastBody } from '@coreui/react';
import React, { useState } from 'react'

const ToastComponent =(props:any) =>{
    const [content, ] = useState(props.content);

return(
    <CToaster 
    position='top-right'
    key='toaster'
    >
        <CToast
        key={'toast1'}
        show={true}
        autohide={true && 3000}
        fade={true}
        >
            <CToastHeader closeButton={true}>
                {content}
            </CToastHeader>
            <CToastBody>
            {`${content} processing is successful!`}
            </CToastBody>
        </CToast>
    </CToaster>
)

}
export default ToastComponent;
