import { ACTION_TYPES } from './actionTypes';


const createSite = (payload) => ({
    type: ACTION_TYPES.CREATE_SITE,
    payload,
});
const createZone = (payload) => ({
    type: ACTION_TYPES.CREATE_ZONE,
    payload,
});

export default {
    createSite,
    createZone,
};
