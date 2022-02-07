import { ACTION_TYPES } from '../actions/actionTypes';

const initialState = {
    SOH_ASSETS: null,
};

export const SohReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.USER_LOGIN:
            {
                // alert(JSON.stringify(action.payload))
                return {
                    ...state,
                    SOH_ASSETS: action.payload.SOH_ASSETS,
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
