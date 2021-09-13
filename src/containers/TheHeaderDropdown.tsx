import React from 'react'
import { useReactOidc } from '@axa-fr/react-oidc-context';

import {
  CBadge,
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { USER_AVATAR } from '../configs/apiConfig';

const TheHeaderDropdown = () => {

  const { logout } = useReactOidc();

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      // direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={USER_AVATAR}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Demo
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>

        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          {/* <CIcon name="cil-user" className="mfe-2" />Logout */}
          <CButton key="user-button" color="info" shape="rounded-pill" size='6px' onClick={logout}>
                     log out
          </CButton>
        </CDropdownItem>
        <CDropdownItem divider />
        {/* <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Lock Account
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
