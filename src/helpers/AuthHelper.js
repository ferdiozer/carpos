

import { store } from "../StateManagment/Redux/Store/Index";

export const getHeaders = async () => {
  try {
    const state = await store.getState();
    const { token } = state.auth
    return { Authorization: token, 'Content-Type': 'application/json' }

  } catch (error) { }
}