import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const initialState = {
    user: null
};

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};

const removerUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const loginUser = (credentials) => async (dispatch) => {
    const { credential, password } = credentials;
    

    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({credential, password})
    });

    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return user;
    }
}

export const logoutUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removerUser());
    }
}

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {...state, user: action.payload}
        case REMOVE_USER:
            return {...state, user: null}
        default:
            return state;
    }
}

export default sessionReducer;
