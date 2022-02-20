import React from "react";
import CreateView from "./menuViews/createView";
import SitesView from "./menuViews/sitesView";
function NavInfo(props) {
    return <div className={"nav-info"}>
        <h3>Center</h3>
        <span className="info-row">latitude: {props.center.lat}</span>
        <span className="info-row">longitude: {props.center.lng}</span>
        <span className="info-row">Zoom: {props.zoom}</span>
    </div>
}
const vocabulary = {
    view: "view",
    edit: "edit",
    create: "create"
}
const menuModes = [
    { value: "view", label: vocabulary["view"] },
    // { value: "edit", label: vocabulary["edit"] },
    { value: "create", label: vocabulary["create"] }
];

const NavOptions = (props) => {
    const navOptions = menuModes.map(mode => {
        const isSelected = (props.selectedMode === mode.value) ? "selected" : "";
        return <li key={mode.value} className={isSelected} onClick={() => { props.select(mode.value) }}> {mode.label} </li>
    })
    return <ul className={"nav-options"}>
        {navOptions}
    </ul>
}

const HiddenMenuButton = (props) => {
    const symbol = props.hiddenStatus ? ">" : "x"
    const buttonClass = props.hiddenStatus ? "" : "hidden";
    return <div className={"hide-menu " + buttonClass} onClick={props.handleClick}>
        {symbol}
    </div>

}

function MapSideMenu(props) {
    const [selectedMode, setMode] = React.useState("view");
    const [menuHidden, setMenuHidden] = React.useState(true);

    const handleModeChanges = (mode) => {
        props.onChange && props.onChange(mode);
        setMode(mode);
    }
    const handleHideMenu = () => {
        menuHidden && props.onChange && props.onChange(selectedMode);
        // menuHidden && setMode("view");
        setMenuHidden(!menuHidden)
    }

    const viewsMapping = {
        view: <SitesView selectSite={props.selectSite} />,
        edit: null,
        create: <CreateView valuesCallBack={props.getFormValues} saveSite={props.saveSite} lastGeneratedPolygon={props.lastGeneratedPolygon} fetchedZones={props.fetchedZones} fetchZone={props.fetchZone} />
    }

    const hideClass = menuHidden ? "hidden" : "";
    return <div className={"map-side-menu " + hideClass}>
        <NavOptions selectedMode={selectedMode} select={handleModeChanges} />
        <HiddenMenuButton handleClick={handleHideMenu} hiddenStatus={menuHidden} />
        <div className='body'>
            <NavInfo center={props.mapCenter} zoom={props.mapZoom} />
            {viewsMapping[selectedMode]}
        </div>
    </div>
}

export default MapSideMenu;