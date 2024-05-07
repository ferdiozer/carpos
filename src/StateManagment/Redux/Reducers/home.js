import {
    SET_SIGNAL_NOTIFICATIONS,
    SET_NEW_SIGNALS,
    SET_OPENED_SIGNALS,
    SET_CLOSED_SIGNALS,
    SET_USER_NOTIFICATIONS,
    SET_NEW_SIGNALS_NEW,
    SET_NEW_SIGNALS_ADD,
    SET_CLOSE_SIGNAL,
    SET_OPENED_SIGNAL_LASTMESSAGE,
    SET_NOW_DATE,
    SET_NOTIFICATION_DEL
} from "../Actions/Index";

const initialState = {
    signalNotifications: {}, //id bazlı indexlenip data optimize sağlanması
    signalNotificationsArr: [],
    userNewSignalsArr: [],
    userOpenedSignalsArr: [],
    userClosedSignalsArr: [],
    userNotificationsArr: [],
    userNotificationNew: false,
    nowDate: new Date(),
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIGNAL_NOTIFICATIONS: {
            return {
                ...state,
                signalNotificationsArr: action.payload
            };
        }
        case SET_NEW_SIGNALS: {
            return {
                ...state,
                userNewSignalsArr: action.payload
            };
        }
        case SET_OPENED_SIGNALS: {
            return {
                ...state,
                userOpenedSignalsArr: action.payload
            };
        }
        case SET_CLOSED_SIGNALS: {
            return {
                ...state,
                userClosedSignalsArr: action.payload
            };
        }
        case SET_USER_NOTIFICATIONS: {
            return {
                ...state,
                userNotificationsArr: action.payload
            };
        }
        case SET_NOTIFICATION_DEL: {
            return {
                ...state,
                userNotificationsArr: state.userNotificationsArr.filter(v => v._id != action.payload),
            };
        }
        case SET_NEW_SIGNALS_NEW: {
            return {
                ...state,
                userNotificationNew: action.payload
            };
        }
        case SET_NEW_SIGNALS_ADD: {
            return {
                ...state,
                userNewSignalsArr: [action.payload, ...state.userNewSignalsArr],
            };
        }
        case SET_CLOSE_SIGNAL: {
            return {
                ...state,
                userNewSignalsArr: state.userNewSignalsArr.filter(v => v._id != action.payload),
                userOpenedSignalsArr: state.userOpenedSignalsArr.filter(v => v._id != action.payload),
            };
        }
        case SET_OPENED_SIGNAL_LASTMESSAGE: {
            const { signalId } = action.payload
            return {
                ...state,
                userOpenedSignalsArr: state.userOpenedSignalsArr.map(
                    (signal, i) => signal._id === signalId ? { ...signal, lastMessage: action.payload.message }
                        : signal
                )
            };
        }
        case SET_NOW_DATE: {
            return {
                ...state,
                nowDate: action.payload
            };
        }

        default:
            return state;
    }
}

export default Reducer;