import React from 'react';
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";
function parsePolygonPath(polygonPath) {
    let path = []
    for (var i in polygonPath) {
        path.push({
            lat: polygonPath[i].lat(),
            lng: polygonPath[i].lng()
        })
    }
    return path;
}
function getDrawingShapeGeneralOptions(fillColor) {
    return {
        fillColor: fillColor,
        fillOpacity: .5,
        strokeWeight: 5,
        clickable: true,
        // editable: true,
        zIndex: 1,
        // draggable: true
    }
}
function ZoneMode(props) {
    const isVisible = props.isVisible;
    const fillColor = props.fillColor || '#eb4034';
    const isCreating = props.isCreating;

    const completePoygon = polygonObj => {
        props.setIsCreating(false)
        const parsedPlygon = {
            fillColor: polygonObj.fillColor,
            location: parsePolygonPath(polygonObj.getPath().Be),
            objectType: "polygon"
        }
        props.getGeneratedPolygon && props.getGeneratedPolygon(parsedPlygon);
    }
    const options = {
        drawingControl: isCreating,
        drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                // window.google.maps.drawing.OverlayType.CIRCLE,
                window.google.maps.drawing.OverlayType.POLYGON,
                // window.google.maps.drawing.OverlayType.RECTANGLE,
            ],
        },
        circleOptions: getDrawingShapeGeneralOptions(fillColor),
        polygonOptions: getDrawingShapeGeneralOptions(fillColor),
        rectangleOptions: getDrawingShapeGeneralOptions(fillColor)
    }

    return isVisible ?
        <DrawingManager
            drawingMode={isCreating ? window.google.maps.drawing.OverlayType.POLYGON : null}
            options={options}
            onPolygonComplete={setPolygon => completePoygon(setPolygon)}
        // onRectangleComplete={setRectangle => console.log({ setRectangle })}
            // onCircleComplete={setCircle => console.log({ setCircle })}
        onMouseUp={r => console.log({ r })}
        onDragEnd={r => console.log({ r })}
            onUnmount={d => console.log({ d })}
        />
        : null
}

export default ZoneMode;
