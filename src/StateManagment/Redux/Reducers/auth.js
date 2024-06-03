import { PUSH_LAST_EXIST_IN_CAR_PARKING, SET_HOURS, SET_IS_LOCK, SET_IS_LOGIN, SET_SELECTED_VEHICLE_TYPE_INDEX, SET_SETTINGS, SET_TARIFFS, SET_USER, SET_USER_COMPANY_NAME, SET_USER_PASSWORD, SET_VEHICLE_TYPES } from "../Actions/Index";

const initialState = {
  isLoading: false,
  isLogin: false,
  isLock: true,
  user: {},
  token: null,
  vehicleTypes: [],
  vehicleHours: [],
  settings: {},
  selectedVehicleTypeIndex: 0,
  lastExitInCarParkingList: [],
  tariffList: []
};

const userprofile_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    case SET_IS_LOGIN: {
      return {
        ...state,
        isLogin: action.payload
      };
    }
    case SET_IS_LOCK: {
      return {
        ...state,
        isLock: action.payload
      };
    }
    case SET_USER_PASSWORD: {
      return {
        ...state,
        user: {
          ...state.user,
          password: action.payload
        }
      };
    }
    case SET_USER_COMPANY_NAME: {
      return {
        ...state,
        user: {
          ...state.user,
          companyName: action.payload
        }
      };
    }
    case SET_VEHICLE_TYPES: {
      return {
        ...state,
        vehicleTypes: action.payload
      };
    }
    case SET_SETTINGS: {
      return {
        ...state,
        settings: action.payload
      };
    }
    case SET_SELECTED_VEHICLE_TYPE_INDEX: {
      return {
        ...state,
        selectedVehicleTypeIndex: action.payload
      };
    }
    case PUSH_LAST_EXIST_IN_CAR_PARKING: {
      return {
        ...state,
        lastExitInCarParkingList: [action.payload, ...(state.lastExitInCarParkingList || [])].slice(0, 10)
      };
    }
    case SET_HOURS: {
      return {
        ...state,
        vehicleHours: action.payload
      };
    }
    case SET_TARIFFS: {
      return {
        ...state,
        tariffList: action.payload
      };
    }

    default:
      return state;
  }
}

export default userprofile_Reducer;