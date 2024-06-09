export const SET_USER = "SET_USER";
export const SET_IS_LOGIN = "SET_IS_LOGIN";
export const SET_IS_LOCK = "SET_IS_LOCK";
export const SET_USER_COMPANY_NAME = "SET_USER_COMPANY_NAME";
export const SET_USER_PASSWORD = "SET_USER_PASSWORD";
export const SET_VEHICLE_TYPES = "SET_VEHICLE_TYPES";
export const SET_SETTINGS = "SET_SETTINGS";
export const SET_SELECTED_VEHICLE_TYPE_INDEX = "SET_SELECTED_VEHICLE_TYPE_INDEX";
export const PUSH_LAST_EXIST_IN_CAR_PARKING = "PUSH_LAST_EXIST_IN_CAR_PARKING";

export const SET_HOURS = "SET_HOURS";
export const SET_TARIFFS = "SET_TARIFFS";

export const setUserAc = payload => ({
  type: SET_USER,
  payload: payload
});

export const setIsLoginAc = payload => ({
  type: SET_IS_LOGIN,
  payload: payload
});

export const setIsLockAc = payload => ({
  type: SET_IS_LOCK,
  payload: payload
});

export const setUserCompanyName = payload => ({
  type: SET_USER_COMPANY_NAME,
  payload: payload
});

export const setUserPasswordAc = payload => ({
  type: SET_USER_PASSWORD,
  payload: payload
});

export const setVehicleTypesAc = payload => ({
  type: SET_VEHICLE_TYPES,
  payload: payload
});

export const setSettingsAc = payload => ({
  type: SET_SETTINGS,
  payload: payload
});

export const setSelectedVehicleTypeIndexAc = payload => ({
  type: SET_SELECTED_VEHICLE_TYPE_INDEX,
  payload: payload
});

export const pushLastExistInCarParkingAc = payload => ({
  type: PUSH_LAST_EXIST_IN_CAR_PARKING,
  payload: payload
});

export const setHoursAc = payload => ({
  type: SET_HOURS,
  payload: payload
});

export const setTariffsAc = payload => ({
  type: SET_TARIFFS,
  payload: payload
});





