import React from 'react';
import CanvasDraw from "react-canvas-draw";

class Drawing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingHeight: 300,
            drawingWidth: 300,
            brushSize: 3,
        };
    }

    render() {
        return (
            <div>
                <div className="canvas-holder">
                <CanvasDraw hideGrid ref={canvasDraw => (this.saveableCanvas = canvasDraw)} 
                    canvasWidth={this.state.drawingWidth}
                    canvasHeight={this.state.drawingHeight}
                    brushColor={this.props.currentDrawColour}
                    brushRadius={this.state.brushSize}/>
                </div>
            </div>
        )
    }
}

export default Drawing;