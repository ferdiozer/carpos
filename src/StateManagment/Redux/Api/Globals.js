



import axios from '../../../helpers/APIHelper'




import { apiUrls } from "./constants";



export const getSignalAssets = (category) => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrls.signalAssets_g.replace("{category}", category)).then(res => res.data).then(resolve).catch(reject)
  })
}

export const postSignal = (postData) => {
  return new Promise((resolve, reject) => {
    axios.post(apiUrls.signal_p, postData).then(res => res.data).then(resolve).catch(reject)
  })
}

export const postNotificationNewSignal = (postData) => {
  return new Promise((resolve, reject) => {
    axios.post(apiUrls.notificationNewSignal_p, postData).then(res => res.data).then(resolve).catch(reject)
  })
}

export const getMySignals = (type) => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrls.expertMySignals_g.replace("{type}", type)).then(res => res.data).then(resolve).catch(reject)
  })
}

export const closeMySignal = (id, profitLoss) => {
  return new Promise((resolve, reject) => {
    axios.post(apiUrls.expertCloseSignal_p.replace("{id}", id), { profitLoss: profitLoss }).then(res => res.data).then(resolve).catch(reject)
  })
}

export const sendSignalNotification = (id, message) => {
  return new Promise((resolve, reject) => {
    axios.post(apiUrls.expertSignalSendNotification_p.replace("{id}", id), { message: message }).then(res => res.data).then(resolve).catch(reject)
  })
}

export const getExpertNotification = () => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrls.expertNotificationList_g).then(res => res.data).then(resolve).catch(reject)
  })
}

export const getSignalNotifications = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrls.getSignalNotifications_g.replace("{id}", id)).then(res => res.data).then(resolve).catch(reject)
  })
}

export const sendFeedback = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(apiUrls.sendFeedback_p, data).then(res => res.data).then(resolve).catch(reject)
  })
}

export const userNewSignals = () => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrls.userNewSignals_q).then(res => res.data).then(resolve).catch(reject)
  })
}

export const userFollowSignal = (id) => {
  return new Promise((resolve, reject) => {
    axios.post(apiUrls.userFollowSignal_p.replace("{id}", id)).then(res => res.data).then(resolve).catch(reject)
  })
}

export const userOpenedSignals = () => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrls.userOpenedSignals_q).then(res => res.data).then(resolve).catch(reject)
  })
}
export const userClosedSignals = () => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrls.userClosedSignals_q).then(res => res.data).then(resolve).catch(reject)
  })
}

export const getUserNotification = () => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrls.userNotificationList_g).then(res => res.data).then(resolve).catch(reject)
  })
}

export const getNotifications = () => {
  return new Promise((resolve, reject) => {
    axios.get(apiUrls.notificationList_g).then(res => res.data).then(resolve).catch(reject)
  })
}

export const delNotification = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(apiUrls.delNotification_d.replace("{id}", id)).then(res => res.data).then(resolve).catch(reject)
  })
}

export const postInitApp = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(apiUrls.initApp_p, data).then(res => res.data).then(resolve).catch(reject)
  })
}

export const marketplacePaid = (postData) => {
  return new Promise((resolve, reject) => {
    axios.post(apiUrls.marketplacePaid_p, postData).then(res => res.data).then(resolve).catch(reject)
  })
}