import { ACTION_TYPES } from '../actions/actionTypes';

const initialState = {
    modal: false,
    zoneModal: false,
};

export const siteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.CREATE_SITE:
            {
                // alert(JSON.stringify(action.payload))
                return {
                    ...state,
                    modal: action.payload.modal,
                }
            }
        /**xw
         * Now save the newly modified array of all orders 
         * into our redux store
         */
        case ACTION_TYPES.CREATE_ZONE:
            {
                // alert(JSON.stringify(action.payload))
                return {
                    ...state,
                    zoneModal: action.payload.zoneModal,
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
