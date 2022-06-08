import { store } from '../redux/store'

export function fetchToken() {
  if (store.getState().user) {
    const { token } = store.getState().user.userData
    return token
  }
}
