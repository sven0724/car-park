import React from 'react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <i className="cil-speedometer c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Operation',
    to: '/operation',
    icon: <i className="cid-parking c-sidebar-nav-icon"/>,
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Parking',
    route: '/parking',
    icon: <i className="cil-car-alt c-sidebar-nav-icon"/>,
   
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Car park',
        to: '/parking/car-park',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Parking zone',
        to: '/parking/parking-zone',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Parking space',
        to: '/parking/parking-space',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Entrance',
    route: '/entrance',
    icon: <i className="cil-monitor c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Barrier Gate',
        to: '/entrance/barrier-gate',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Camera',
        to: '/entrance/camera',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Inductive Loop Detector',
        to: '/entrance/inductive-loop-detector',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Octopus Device',
        to: '/entrance/octopus-device',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Car Entrance',
        to: '/entrance/car-entrance',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Report',
    to: '/report',
    icon: <i className="cil-chart-line c-sidebar-nav-icon"/>,
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'Entrance Record',
        to: '/report/entrance-record',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Monthly Parking Record',
        to: '/report/monthly-parking-record',
      },
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'CRM',
    route: '/crm',
    icon: <i className="cil-people c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Customer',
        to: '/crm/customer',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },

    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Payment',
    route: '/payment',
    icon: <i className="cil-money c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Price Lists',
        to: '/payment/price-list',
      },
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Common',
    to: '/common',
    icon: <i className="cil-apps-settings c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    },
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Holiday',
        to: '/common/holiday',
      },
    ]
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  
]

export default _nav
