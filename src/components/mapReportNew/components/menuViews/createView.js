import React from "react";
import './createView.css';
import { Button, Checkbox } from "@material-ui/core";
import BasicTextFields from "../../../Input";

const allColors = [
    { label: 'blue', hexa: '#00ccff', value: 'blue' },
    { label: 'red', hexa: '#eb4034', value: 'red' },
    { label: 'orange', hexa: '#ff9b30', value: 'orange' },
    { label: 'yellow', hexa: '#f8ff29', value: 'yellow' },
    { label: 'green', hexa: '#32f72f', value: 'green' },
    { label: 'pink', hexa: '#f026f0', value: 'pink' }
];
const SimpleColorPicker = (props) => {
    const [activeColor, setActiveColor] = React.useState("blue");
    const setColor = colorSelected => {
        setActiveColor(colorSelected);
        props.selectColor && props.selectColor(colorSelected.hexa)
    }
    React.useEffect(() => {
        setActiveColor(allColors[0]);
    }, [])
    return <div className="color-picker-wrapper">
        {allColors.map(color => {
            const selected = color.value === activeColor.value ? "selected" : "";
            return <span key={color.value} className={selected} style={{ backgroundColor: color.hexa }} onClick={() => { setColor(color) }}></span>
        })}
    </div>
}
const validateForm = (formValues) => {
    const ignoreValues = ["zoneDesc"]
    for (var key in formValues) {
        if (!formValues[key] && !ignoreValues.includes(key))
            return false;
    }
    return true;
}
const CreateView = (props) => {
    const initFormValues = { site: "", zoneDesc: "", zoneMode: false, color: "#00ccff" }
    const [formValues, setFormValues] = React.useState(initFormValues);
    const handleSave = () => {
        if (validateForm(formValues))
            props.saveSite && props.saveSite(formValues);
    }
    React.useEffect(() => { props.valuesCallBack && props.valuesCallBack(formValues); }, [formValues]);

    const handleFormChanges = (inputName, inputValue) => {
        setFormValues(prevProps => ({
            ...prevProps,
            [inputName]: inputValue
        }));
    };

    const handleAddZone = (polygon, zoneName) => {
        polygon.zone_name = zoneName;
        props.fetchZone && props.fetchZone(polygon);
        handleFormChanges("zoneDesc", "");
    }

    return <div>
        <div className="create-view-wrapper">
        <h3> Site Details </h3>
        <div className="row">
            <BasicTextFields margin={10} name="Site Name" value={formValues.site} onChangeEvent={e => handleFormChanges("site", e.target.value)} />
        </div>
        <div className="row">
            <BasicTextFields margin={10} name="Image URL" value={formValues.siteImage} onChangeEvent={e => handleFormChanges("siteImage", e.target.value)} />
        </div>
        <h3>Site Coordinates</h3>
        <div className="row">
            <BasicTextFields margin={5} type="number" name="Latitude A" value={formValues.site_position_a_lat} onChangeEvent={e => handleFormChanges("site_position_a_lat", e.target.value)} />
            <BasicTextFields margin={5} type="number" name="Longitude A" value={formValues.site_position_a_lng} onChangeEvent={e => handleFormChanges("site_position_a_lng", e.target.value)} />
            <BasicTextFields margin={5} type="number" name="Latitude B" value={formValues.site_position_b_lat} onChangeEvent={e => handleFormChanges("site_position_b_lat", e.target.value)} />
            <BasicTextFields margin={5} type="number" name="Longitude B" value={formValues.site_position_b_lng} onChangeEvent={e => handleFormChanges("site_position_b_lng", e.target.value)} />
            {/* <input type="number" onChange={e => handleFormChanges("site_position_a_lat", e.target.value)} placeholder="Latitude A" />
            <input type="number" onChange={e => handleFormChanges("site_position_a_lng", e.target.value)} placeholder="Longitude A" />
            <input type="number" onChange={e => handleFormChanges("site_position_b_lat", e.target.value)} placeholder="Latitude B" />
            <input type="number" onChange={e => handleFormChanges("site_position_b_lng", e.target.value)} placeholder="Longitude B" /> */}
        </div>
        <div className="row">
            <h3>Zone Mode</h3>
            <Checkbox style={{ color: 'white' }} color="white" onChange={e => handleFormChanges("zoneMode", e.target.checked)} />
        </div>
        {formValues.zoneMode && <div>
            <div className="row">
                <BasicTextFields margin={5} name="Zone Name" value={formValues.zoneDesc} onChangeEvent={e => handleFormChanges("zoneDesc", e.target.value)} />
            </div>
            <div className="row">
                <span>Zone Color</span>
            <SimpleColorPicker selectColor={(hexaValue) => handleFormChanges("color", hexaValue)} />
        </div>
            {props.lastGeneratedPolygon && <div className="color-picker-wrapper row zone-to-add">
                {formValues.zoneDesc} - {props.lastGeneratedPolygon.objectType}
                <span style={{ backgroundColor: props.lastGeneratedPolygon.fillColor }}></span>
                <Button
                    variant="contained"
                    disabled={!formValues.zoneDesc}
                    onClick={() => { handleAddZone(props.lastGeneratedPolygon, formValues.zoneDesc) }}>
                    Add
                </Button>
            </div>}

            {props.fetchedZones && props.fetchedZones.length > 0 && <div>
                <h3> Added Zones </h3>
                {props.fetchedZones.map(zone => {
                    return <div className="zones-creation-view">
                        {zone.zone_name} - {zone.objectType}
                        <span style={{ backgroundColor: zone.fillColor }}></span>
                    </div>
                })}
            </div>}
        </div>}
        </div>
        <div className="map-create-footer">
            <Button variant="contained" onClick={handleSave} > Save Site </Button>
        </div>

    </div>
}

export default CreateView;