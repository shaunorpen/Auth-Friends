import { combineReducers, createStore } from 'redux';

// Actions

const SET_USER_DETAILS = 'SET_USER_DETAILS';
const SET_FRIENDS_LIST = 'SET_FRIENDS_LIST';
const SET_FORM_VALUES = 'SET_FORM_VALUES';

// Action Creators

export function setUserDetails(userDetails) {
    return {
        type: SET_USER_DETAILS,
        payload: userDetails,
    };
}

export function setFriendsList(friendsList) {
    return {
        type: SET_FRIENDS_LIST,
        payload: friendsList,
    };
}

export function setFormValues(formValues) {
    return {
        type: SET_FORM_VALUES,
        payload: formValues,
    };
}

// Initial State

const initialUserDetails = { username: '', password: '', };
const initialFriendsList = [];
export const initialFormValues = { name: '', age: '', email: '', };

// Reducers

function userReducer(state = initialUserDetails, action) {
    switch (action.type) {
        case SET_USER_DETAILS:
            return action.payload;
        default:
            return state;
    }
}

function friendsReducer(state = initialFriendsList, action) {
    switch (action.type) {
        case SET_FRIENDS_LIST:
            return action.payload;
        default:
            return state;
    }
}

function formReducer(state = initialFormValues, action) {
    switch (action.type) {
        case SET_FORM_VALUES:
            return action.payload;
        default: 
            return state;
    }
}

// Combined Reducer

const rootReducer = combineReducers({
    userDetails: userReducer,
    friendList: friendsReducer,
    formValues: formReducer,
});

// Store

export const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);