/* eslint-disable */

import React from 'react';
import { withOidcSecure } from '@axa-fr/react-oidc-context';


// const Holiday = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Holiday = React.lazy(() => import('./views/Holiday'));
const HolidayEdit = React.lazy(() => import('./views/HolidayEdit'));

const CarPark = React.lazy(() => import('./views/CarPark'));
const CarParkEdit = React.lazy(() => import('./views/CarParkEdit'));
const ParkingZoneEdit = React.lazy(() => import('./views/Parking'));
const ParkingZone = React.lazy(() => import('./views/ParkingZone'));
const ParkingSpace = React.lazy(() => import('./views/ParkingSpace'));
const ParkingSpaceEdit = React.lazy(() => import('./views/ParkingSpaceEdit'));

// const Entrance = React.lazy(() => import('./views/Entrance'));
const BarrierGate = React.lazy(() => import('./views/BarrierGate'));
const BarrierGateEdit = React.lazy(() => import('./views/BarrierGateEdit'));

const Camera = React.lazy(() => import('./views/Camera'));
const CameraEdit = React.lazy(() => import('./views/CameraEdit'));

const InductiveLoopDetector = React.lazy(() => import('./views/InductiveLoopDetector'));
const InductiveLoopDetectorEdit = React.lazy(() => import('./views/InductiveLoopDetectorEdit'));

const OctopusDevice = React.lazy(() => import('./views/OctopusDevice'));
const OctopusDeviceEdit = React.lazy(() => import('./views/OctopusDeviceEdit'));

const CarEntrance = React.lazy(() => import('./views/CarEntrance'));
const CarEntranceEdit = React.lazy(() => import('./views/CarEntranceEdit'));


// const Report = React.lazy(() => import('./views/Report'));
const MonthlyParkingRecord = React.lazy(() => import('./views/MonthlyParkingRecord'));
const MonthlyParkingRecordEdit = React.lazy(() => import('./views/MonthlyParkingRecordEdit'));

const EntranceRecord = React.lazy(() => import('./views/EntranceRecord'));
const EntranceRecordEdit = React.lazy(() => import('./views/EntranceRecordEdit'));


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Crm = React.lazy(() => import('./views/Crm'));
const Customer = React.lazy(() => import('./views/Customer'));

const CustomerEdit = React.lazy(() => import('./views/CustomerEdit'));
const PriceList = React.lazy(() => import('./views/PriceList'));
const PriceListEdit = React.lazy(() => import('./views/PriceListEdit'));

const Payment = React.lazy(() => import('./views/Payment'));
const Home = React.lazy(() => import('./views/Home'));
const Operation = React.lazy(() => import('./views/Operation') );



const routes = [
  { path: '/', exact: true, name: 'Home', component:withOidcSecure(Home) },
  { path: '/dashboard', name: 'Dashboard', component:  withOidcSecure(Dashboard), exact:true },
  { path: '/operation', name: 'Operation', component:  withOidcSecure(Operation), exact:true },

  { path: '/parking/car-park', name: 'car-park', component:withOidcSecure(CarPark), exact: true },
  { path: '/parking/car-park/:id', name: 'car-park-edit', component: withOidcSecure(CarParkEdit) },
  { path: '/parking/parking-zone', name: 'parking-zone', component: withOidcSecure(ParkingZone), exact: true },
  { path: '/parking/parking-zone/:id', name: 'parking-zone-edit', component: withOidcSecure(ParkingZoneEdit) },

  { path: '/parking/parking-space', name: 'parking-space', component: withOidcSecure(ParkingSpace), exact:true },
  { path: '/parking/parking-space/:id', name: 'parking-space-edit', component: withOidcSecure(ParkingSpaceEdit) },

  // { path: '/entrance', component: Entrance, exact: true },
  { path: '/entrance/barrier-gate', name: 'Barrier Gate', component: withOidcSecure(BarrierGate), exact: true },
  { path: '/entrance/barrier-gate/:id', name: 'Barrier Gate Edit', component: withOidcSecure(BarrierGateEdit) },
  { path: '/entrance/camera', name: 'Camera', component: withOidcSecure(Camera) , exact: true },
  { path: '/entrance/camera/:id', name: 'Camera Edit', component: withOidcSecure(CameraEdit) },

  { path: '/entrance/inductive-loop-detector', name: 'Inductive Loop Detector', component: withOidcSecure(InductiveLoopDetector) , exact: true },
  { path: '/entrance/inductive-loop-detector/:id', name: 'Inductive Loop Detector Edit', component: withOidcSecure(InductiveLoopDetectorEdit) },

  { path: '/entrance/octopus-device', name: 'Octopus Device', component: withOidcSecure(OctopusDevice) , exact: true },
  { path: '/entrance/octopus-device/:id', name: 'Octopus Device Edit', component: withOidcSecure(OctopusDeviceEdit) },

  { path: '/entrance/car-entrance', name: 'Car Entrance', component: withOidcSecure(CarEntrance) , exact: true },
  { path: '/entrance/car-entrance/:id', name: 'Car Entrance Edit', component: (CarEntranceEdit) },


  // { path: '/report', component: Report, exact: true },
  { path: '/report/monthly-parking-record', name: 'Monthly Parking Record', component: withOidcSecure(MonthlyParkingRecord),exact: true },
  { path: '/report/monthly-parking-record/:id', name: 'Monthly Parking Record Edit', component:withOidcSecure(MonthlyParkingRecordEdit)},

  { path: '/report/entrance-record', name: 'Entrance Record', component: withOidcSecure(EntranceRecord), exact: true },
  { path: '/report/entrance-record/:id', name: 'Entrance Record Edit', component: withOidcSecure(EntranceRecordEdit) },

  { path: '/crm', exact: true, component: Crm },
  { path: '/crm/customer', name: 'Customer ', component: withOidcSecure(Customer), exact: true },
  { path: '/crm/customer/:id', name: 'Customer Edit', component: withOidcSecure(CustomerEdit)},


  { path: '/payment',  component: Payment, exact: true },
  { path: '/payment/price-list', name: 'Price List', component: withOidcSecure(PriceList), exact: true },
  { path: '/payment/price-list/:id', name: 'Price List Edit', component: withOidcSecure(PriceListEdit)},

  { path: '/common/holiday', name: 'Holiday', component: withOidcSecure(Holiday), exact: true },
  { path: '/common/holiday/:id', name: 'HolidayEdit', component: withOidcSecure(HolidayEdit) },


];

export default routes;
