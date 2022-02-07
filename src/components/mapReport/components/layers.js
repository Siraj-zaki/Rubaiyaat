import React from 'react';
// import RangeSlider from 'react-bootstrap-range-slider';

function LayersPicker(props) {
    const layers = props.layers || 0;
    let layerButtons = [];
    let isSelected = props.currentLayer === "main" ? "selected" : "";
    layerButtons.push(
        <button key="main" className={isSelected} onClick={() => { props.onSelect("main") }}> main layer </button>
    )
    for (var i = 1; i <= layers; i++) {
        isSelected = props.currentLayer === i.toString() ? "selected" : "";
        layerButtons.push(
            <button key={i} value={i} className={isSelected} onClick={(e) => { props.onSelect(e.target.value) }}>
                {i}
            </button>
        )
    }
    return <div className={"map-layers"}>
        <h3>Layers</h3>
        {layerButtons}
        {/* opacity */}
        {/* <RangeSlider
            value={props.opacity}
            onChange={changeEvent => props.setOpacity(parseFloat(changeEvent.target.value))}
            max={1}
            min={0}
            step={0.1}
            size={"sm"}
        /> */}
    </div>
}

export default LayersPicker;