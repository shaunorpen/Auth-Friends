import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import axiosWithAuth from '../helpers/axiosWithAuth';
import thunk from 'redux-thunk';

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

export const addFriend = friend => dispatch => {
    axiosWithAuth().post('http://localhost:5000/api/friends', friend)
        .then(res => {
            dispatch(setFriendsList(res.data));
            dispatch(setFormValues(initialFormValues));
        })
        .catch(err => {
            alert(err.response.data.message);
        });  
}

export const updateFriend = friend => dispatch => {
    axiosWithAuth().put(`http://localhost:5000/api/friends/${friend.id}`, {
            name: friend.name,
            age: friend.age,
            email: friend.email,
        })
        .then(res => {
            dispatch(setFriendsList(res.data));
            dispatch(setFormValues(initialFormValues));
        })
        .catch(err => {
            alert(err.response.data.message);
        });
}

export const deleteFriend = id => dispatch => {
    axiosWithAuth().delete(`http://localhost:5000/api/friends/${id}`)
        .then(res => {
            dispatch(setFriendsList(res.data));
        })
        .catch(err => {
            alert(err.response.data.message);
        });
}

export const getFriends = () => dispatch => {
    axiosWithAuth().get('http://localhost:5000/api/friends')
        .then(res => {
            dispatch(setFriendsList(res.data));
        })
        .catch(err => {
            alert(err.response.data.error);
        });
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
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);