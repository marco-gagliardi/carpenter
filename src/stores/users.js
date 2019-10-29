import { defineAsyncActions } from './utils'
import {getUser} from "../utils/api";
const FETCH_USER = defineAsyncActions('FETCH_USER');
const DEFAULT_STATE = {
};

export default function reducer (state = DEFAULT_STATE, action) {
  switch (action.type) {
    /* STANDARD ACTIONS */
    case FETCH_USER.FULFILLED: {
      return {
        ...state,
        [action.meta.id]: action.payload
      }
    }
    default:
      return state
  }
}

export function loadUser (id) {
  return dispatch => {
    const params = {};

    return dispatch({
      type: FETCH_USER,
      payload: getUser(id, params),
      meta: {id}
    })
  }
}