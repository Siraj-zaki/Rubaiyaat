import { ACTION_TYPES } from '../actions/actionTypes';

const initialState = {
    user: {},
    login: false
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.USER_LOGIN:
            {
                // alert(JSON.stringify(action.payload))
                return {
                    ...state,
                    user: action.payload.user,
                    login: action.payload.login
                }
            }
        /**xw
         * Now save the newly modified array of all orders 
         * into our redux store
         */
        default:
            return state;
    }
};
