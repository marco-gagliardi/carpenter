import { defineAsyncActions } from './utils'
import {
  getResource,
  loadResources,
  deleteResource,
  updateResource,
  createResource,
  OPERATORS,
  patchResource
} from "../utils/api";

const RESOURCE_ENDPOINT = 'users'
const CREATE = defineAsyncActions('CREATE_USERS');
const FETCH = defineAsyncActions('FETCH_USERS');
const LOAD = defineAsyncActions('LOAD_USERS');
const UPDATE = defineAsyncActions('UPDATE_USERS');
const PATCH = defineAsyncActions('PATCH_USERS');
const DELETE = defineAsyncActions('DELETE_USERS');

const DEFAULT_STATE = {
};

export default function reducer (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CREATE.FULFILLED: {
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    }
    case FETCH.FULFILLED: {
      return {
        ...state,
        [action.meta.id]: action.payload
      }
    }
    case LOAD.FULFILLED: {
      return {
        ...state,
        ...(action.payload.reduce((acc, curr) => {
          return ({...acc, [curr.id]: {...curr}})
        }, {}))
      }
    }
    case UPDATE.FULFILLED: {
      return {
        ...state,
        [action.meta.id]: action.meta.payload
      }
    }
    /* Optimistic update approach */
    case PATCH.PENDING: {
      return {
        ...state,
        [action.meta.id]: {...action.meta.payload}
      }
    }
    /* optimistic update fallback: revert change */
    case PATCH.REJECTED: {
      return {
        ...state,
        [action.meta.id]: action.meta.snapshot
      }
    }
    case DELETE.FULFILLED: {
      return {
        ...(Object.values(state).reduce((acc, curr) => {
          if (curr.id === action.meta.id) {
            return ({...acc})
          }
          return ({...acc, [curr.id]: {...curr}})
        }, {}))
      }
    }
    default:
      return state
  }
}
export function createUsers (payload) {
  return {
    type: CREATE,
    payload: createResource(RESOURCE_ENDPOINT, payload)
  }
}

export function fetchUsers (id) {
  return dispatch => {
    const params = {};

    return dispatch({
      type: FETCH,
      payload: getResource(RESOURCE_ENDPOINT, id, params),
      meta: {id}
    })
  }
}

export function loadUsers ({limit, lastId, ...params}) {
  /* params should be something like {lastId, orderBy, orderDir, limit} */
  if (limit) params[OPERATORS.limit] = limit
  if (lastId) params[OPERATORS.lastId] = lastId
  return (dispatch) => {
    return dispatch({
      type: LOAD,
      payload: loadResources(RESOURCE_ENDPOINT, params),
    }).then(payload => payload.value)
  }
}

export function updateUsers (id, payload) {
  return {
    type: UPDATE,
    payload: updateResource(RESOURCE_ENDPOINT, id, payload),
    meta: {id, payload}
  }
}

export function patchUsers (id, payload) {
  return (dispatch, getState) => {
    return dispatch({
      type: UPDATE,
      payload: patchResource(RESOURCE_ENDPOINT, id, payload),
      meta: {id, payload, snapshot: getState()['users'][id]}
    })
  }
}

export function deleteUsers (id) {
  return dispatch => {
    return dispatch({
      type: DELETE,
      payload: deleteResource(RESOURCE_ENDPOINT, id),
      meta: {id}
    })
  }
}