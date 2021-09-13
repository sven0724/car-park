import React from 'react'
import { RootStateOrAny,useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

// sidebar nav config
import navigation from './_nav'
import Logo from '../assets/showLogo'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector((state:RootStateOrAny) => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val:string) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <Logo  height={105} width={255}/>
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
