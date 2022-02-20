import axios from 'axios';

class map_restCalls {
    constructor(args) {
        args = args || {};
        this.baseURL = args.baseURL || 'https://zebra-hospital.herokuapp.com';
        this.baseHeaders = args.baseHeaders || {};
    }
    restCall(config) {
        return axios({
            method: config.method,
            url: config.url,
            data: config.data || {},
            params: config.params || {},
            headers: config.headers || this.baseHeaders
        });
    }
    generateURL(path) {
        if (!path)
            return this.baseURL;
        const slash = path[0] === '/' ? '' : '/';
        return this.baseURL + slash + path;
    }
    //for Locations
    sitesGet() {
        let config = {
            method: "GET",
            url: this.generateURL(`site/get`),
        }
        return this.restCall(config);
    }
    siteGet(locationId, params, data) {
        let config = {
            method: "GET",
            url: this.generateURL(`site/get/${locationId}`),
            data: data || null,
            params: params || null
        }
        return this.restCall(config);
    }
    siteAdd(params, data) {
        let config = {
            method: "POST",
            url: this.generateURL(`site/add`),
            data: data || null,
            params: params || null
        }
        return this.restCall(config);
    }
    siteUpdate() { }
    siteDelete(siteId) {
        let config = {
            method: "DELETE",
            url: this.generateURL(`site/delete/${siteId}`),
        }
        return this.restCall(config);
    }
    //for zones
    zoneGet() {
        let config = {
            method: "GET",
            url: this.generateURL(`zone/get`),
            // data: data || null,
            // params: params || null
        }
        return this.restCall(config);
    }
    zoneGetBySite(siteId) {
        let config = {
            method: "GET",
            url: this.generateURL(`zone/get/${siteId}`),
            // data: data || null,
            // params: params || null
        }
        return this.restCall(config);
    }
    zoneAdd(locationId, params, data) {
        data.site = locationId;
        let config = {
            method: "POST",
            url: this.generateURL(`zone/add`),
            data: data || null,
            params: params || null
        }
        return this.restCall(config);
    }
    zoneUpdate() { }
    zoneDalate(zoneId) {
        let config = {
            method: "DELETE",
            url: this.generateURL(`zone/delete/${zoneId}`),
            // data: data || null,
            // params: params || null
        }
        return this.restCall(config);
    }

    getPins(locationId, params, data) {
        return axios.get(`https://data.police.uk/api/crimes-street/all-crime?lat=${params.lat}&lng=${params.lng}`, {})
    }
}

export default map_restCalls;