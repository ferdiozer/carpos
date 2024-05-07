

//import axios from "axios";
import axios from '../../../helpers/APIHelper'
import { apiUrls } from "./constants";

export const signInAction = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(apiUrls.usersLogin_p, data).then(resolve).catch(reject)
    })
}

export const signUpAction = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(apiUrls.newUser_p, data).then(resolve).catch(reject)
    })
}

export const getConfirmSmsCode = (phone) => {
    return new Promise((resolve, reject) => {
        axios.get(apiUrls.getConfirmSmsCode_g.replace("{phone}", phone)).then(resolve).catch(reject)
    })
}

export const postConfirmSmsCode = (phone, code) => {
    return new Promise((resolve, reject) => {
        axios.post(apiUrls.getConfirmSmsCode_p.replace("{phone}", phone), { code }).then(resolve).catch(reject)
    })
}

export const forgotPasswordGetCode = (phone) => {
    return new Promise((resolve, reject) => {
        axios.get(apiUrls.forgotPassword_g.replace("{phone}", phone)).then(res => res.data).then(resolve).catch(reject)
    })
}

export const forgotPasswordPostCode = (phone, code, password) => {
    return new Promise((resolve, reject) => {
        axios.post(apiUrls.forgotPassword_p.replace("{phone}", phone), { code, password }).then(res => res.data).then(resolve).catch(reject)
    })
}

export const getMe = (token) => {
    const headerConfig = { headers: { Authorization: token, 'Content-Type': 'application/json' } }
    return new Promise((resolve, reject) => {
        axios.get(apiUrls.getMe_g, headerConfig).then(res => res.data).then(resolve).catch(reject)
    })
}

export const updateMyPassword = (postData) => {
    return new Promise((resolve, reject) => {
        axios.post(apiUrls.updatePassword_p, postData).then(res => res.data).then(resolve).catch(reject)
    })
}

export const closeMyAccount = (postData) => {
    return new Promise((resolve, reject) => {
        axios.post(apiUrls.closeMyAccount_p, postData).then(res => res.data).then(resolve).catch(reject)
    })
}

