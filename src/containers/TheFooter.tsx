/* eslint-disable */

import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.anvione.com" target="_blank" rel="noopener noreferrer">AnviParking</a>
        <span className="ml-1">&copy; 2021 Anvi Technologies Limited.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1"></span>
        <a target="_blank" rel="noopener noreferrer">(Build:)</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
