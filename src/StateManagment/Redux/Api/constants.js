

const apiBaseUrl = "https://cryptapi.piyanos.com/api/v1"

export const apiUrls = {
    base: apiBaseUrl,
    newUser_p: `${apiBaseUrl}/users`,
    getConfirmSmsCode_g: `${apiBaseUrl}/users/confirm/phone/{phone}`,
    getConfirmSmsCode_p: `${apiBaseUrl}/users/confirm/phone/{phone}`,
    usersLogin_p: `${apiBaseUrl}/users/login`,
    forgotPassword_g: `${apiBaseUrl}/users/forgot-password/{phone}`,
    forgotPassword_p: `${apiBaseUrl}/users/forgot-password/{phone}`,
    getMe_g: `${apiBaseUrl}/users/me`,
    signalAssets_g: `${apiBaseUrl}/globals/signal_asset?category={category}`,
    signal_p: `${apiBaseUrl}/expert/signal`,
    notificationNewSignal_p: `${apiBaseUrl}/expert/signal/notification/new-signal`,
    expertMySignals_g: `${apiBaseUrl}/expert/signal/my-signals?type={type}`,
    expertCloseSignal_p: `${apiBaseUrl}/expert/signal/close/{id}`,
    expertSignalSendNotification_p: `${apiBaseUrl}/expert/signal/notification/{id}`,
    expertNotificationList_g: `${apiBaseUrl}/expert/notifications`,
    sendFeedback_p: `${apiBaseUrl}/globals/feedback`,
    getSignalNotifications_g: `${apiBaseUrl}/globals/signal-notifications/{id}`,
    updatePassword_p: `${apiBaseUrl}/users/update-password`,
    userNewSignals_q: `${apiBaseUrl}/users/home-new-signals`,
    userFollowSignal_p: `${apiBaseUrl}/users/home-follow-signal/{id}`,
    userOpenedSignals_q: `${apiBaseUrl}/users/home-opened-signals`,
    userClosedSignals_q: `${apiBaseUrl}/users/home-closed-signals`,
    userNotificationList_g: `${apiBaseUrl}/users/notifications`,
    initApp_p: `${apiBaseUrl}/globals/mobile/init`,
    closeMyAccount_p: `${apiBaseUrl}/users/account/close`,
    marketplacePaid_p: `${apiBaseUrl}/users/marketplace/paid`,
    notificationList_g: `${apiBaseUrl}/globals/notifications`,
    delNotification_d: `${apiBaseUrl}/users/notifications/{id}`,
}