import { ACTION_TYPES } from './actionTypes';

// const addSignUpUser = (payload) => ({
//     type: ACTION_TYPES.SIGN_UP_USER,
//     payload,
// });

// const removeSignUpUser = (payload) => ({
//     type: ACTION_TYPES.REMOVE_SIGN_UP_USER,
//     payload,
// });
const userLogin = (payload) => ({
    type: ACTION_TYPES.USER_LOGIN,
    payload,
});

// const userLocation = (payload) => ({
//     type: ACTION_TYPES.USER_LOGIN,
//     payload,
// });

export default {
    // addSignUpUser,
    // removeSignUpUser,
    userLogin,
    // userLocation
};
