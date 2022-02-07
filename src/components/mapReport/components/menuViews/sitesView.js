import React from 'react';
import map_restCalls from '../../maps_utils';
import { Button } from "@material-ui/core";
const RestCalls = new map_restCalls();

function SitesView(props) {
    const [allSites, setAllSites] = React.useState([]);
    const [selectedSite, setSelectedSite] = React.useState({});
    const [currentDeleteFocus, setCurrentDeletFocus] = React.useState(null);
    const handleDeletFocus = (action, siteId) => {
        if (action === "add")
            setCurrentDeletFocus(siteId);
        if (action === "remove")
            setCurrentDeletFocus(null);
    }
    const handleRemoveSite = (siteObj) => {
        RestCalls.siteDelete(siteObj._id).then(response => { getAllSites() });
    }
    const handleSiteSelect = site => {
        props.selectSite && props.selectSite(site);
        setSelectedSite(site);
    }
    const getAllSites = () => {
        RestCalls.sitesGet().then(response => {
            setAllSites(response.data || [])
        })
    }
    React.useEffect(() => {
        getAllSites();
    }, []);
    return <div className={"site-view"}>
        <ul>
            {allSites.map(site => {
                const selected = site._id === selectedSite._id ? "selected" : "";
                return <li key={site._id} className={selected} onClick={() => { handleSiteSelect(site) }}>
                    {site.site_name}
                    <span className="delete-button" onClick={() => handleDeletFocus("add", site._id)}> x </span>
                    {currentDeleteFocus && currentDeleteFocus === site._id && <span className="confirm-delete">
                        Are you sure you want to remove this site?
                        <div className="buttons">
                            <Button variant="contained" onClick={() => { handleDeletFocus("remove", site._id) }} >Cancel</Button>
                            <Button variant="contained" onClick={() => handleRemoveSite(site)} >Remove</Button>
                        </div>
                    </span>}
                </li>
            })}
        </ul>
    </div>
}

export default SitesView;