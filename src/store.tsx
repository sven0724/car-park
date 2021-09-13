import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import {GET_CAR_PARK, GET_PARKING_ZONE, GET_PARKING_SPACE} from './action';

const initialState = {
  sidebarShow: true,
  data:[],
  value:  0,
  carParkData:[], 
  parkingSpaceData:[],
  parkingZoneData:[],
}


const changeState = (state = initialState, action:any) => {
  console.log("action arrived", action.type, action.payload);
  switch (action.type) {
    case 'set':
      return {...state, sidebarShow: action.payload }
    case 'increment':
      return { ...state, value: action.payload }
    case 'decrement':
      return {...state, value: action.payload}
    case GET_CAR_PARK:
      return {...state, carParkData: action.payload}
    case GET_PARKING_ZONE:
      return {...state, parkingZoneData: action.payload}
    case GET_PARKING_SPACE:
      return {...state, parkingSpaceData: action.payload}      
    default: {
      return state
    }
  }
}

const store = createStore(changeState, applyMiddleware(thunk));
export default store
