const BASE_URL = "https://rubaiyat-asset.herokuapp.com";
// const BASE_URL = "https://rubaiyat-qa.herokuapp.com";
// const BASE_URL = 'http://172.16.83.107:5000';
// const BASE_URL = 'http://localhost:5000'
// const BASE_URL = "https://7005-103-225-51-7.ngrok.io";
const Path = {
  GET_ALL_USERS: `${BASE_URL}/user/get/all`,
  GET_MOVEMENT_HISTORY: `${BASE_URL}/assetHistory/get/history/with/epcs`,
  DELETE_USER: `${BASE_URL}/user/delete`,
  LOGIN: `${BASE_URL}/user/login`,
  GET_ALL_SITE: `${BASE_URL}/site/get`,
  GET_ALL_ZONE: `${BASE_URL}/zone/get/`,
  ADD_ROLE: `${BASE_URL}/role/add`,
  GET_ROLE: `${BASE_URL}/role/get`,
  GET_HAND_HELD: `${BASE_URL}/handHeld/get`,
  ADD_HAND_HELD: `${BASE_URL}/handHeld/add`,
  EDIT_HAND_HELD: `${BASE_URL}/handHeld/edit`,
  DELETE_HAND_HELD: `${BASE_URL}/HandHeld/delete`,
  ADD_USER: `${BASE_URL}/user/signup`,
  DELETE_ROLE: `${BASE_URL}/role/delete`,
  EDIT_USER: `${BASE_URL}/user/edit`,
  EDIT_ROLE: `${BASE_URL}/role/edit`,
  GET_ASN: `${BASE_URL}/asn/get`,
  GET_ASN_BY_IBT: `${BASE_URL}/asset/get_Assets_by_asn`,
  GET_BATCH_BY_IBT: `${BASE_URL}/asset/getAssetsByAsn`,
  GET_BATCH: `${BASE_URL}/batch/get`,
  GET_COUNTED_ITEMS: `${BASE_URL}/countedItems/get`,
  GET_COUNTED_ITEMS_BY_PARAM: `${BASE_URL}/countedItems/get1`,
  GET_EPC_DETAIL: `${BASE_URL}/activity/get/by`,
  GET_ASN_BY_EPC: `${BASE_URL}/activity/by/epc`,
  GET_ASSETS_SOH: `${BASE_URL}/asset/getSoh1/62036bc22e18dce8a9fbfa53/620a0772170ade002307b0b3`,
  GET_ASSETS_SOH_PARAM: `${BASE_URL}/asset/getSoh1`,
  GET_ASSETS: `${BASE_URL}/activity/get/all`,
  GET_ASSETS_SITE: `${BASE_URL}/asset/get_Asset_by_site_zone_ref/61b62968c72421b96dd9281b`,
  GET_ASSETS_DETAILS: `${BASE_URL}/assetDetailRoutes/getScans`,
  GET_ASSETS_DETAILS_ASSO: `${BASE_URL}/assetDetailRoutes/getAssociTags`,
  UPLOAD_DATA: `${BASE_URL}/assetDetailRoutes/update/or/add/assetDetail`,
  GET_ASSETS_DETAILS_BY_EPC: `${BASE_URL}/assetDetailRoutes/getByEpc`,
  GET_ASSETS_DETAILS_BY_ALL: `${BASE_URL}/assetDetailRoutes/get`,
  GET_STOCK_ON_HAND: `${BASE_URL}/asset/getSoh/and/counted`,
};

export { Path };
export { BASE_URL };
