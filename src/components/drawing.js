import React from 'react';
import CanvasDraw from "react-canvas-draw";
import Firebase from 'firebase'

class Drawing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingHeight: 300,
            drawingWidth: 300,
            brushSize: 3
        };
    }

    getNumberOfPlayer = () => {
        let playerNumber
        let drawingNumber = this.props.drawingNumber
        if (drawingNumber < 2) {
            playerNumber = "One"
        } else if (drawingNumber < 4) {
            playerNumber = "Two"
        } else if (drawingNumber < 6) {
            playerNumber = "Three"
        } else if (drawingNumber < 8) {
            playerNumber = "Four"
        } else {
            playerNumber = "Five"
        }
        return playerNumber
    }

    getNumberOfDrawing = () => {
        let playerDrawingNumber
        let drawingNumber = this.props.drawingNumber
        if (drawingNumber === 0 || drawingNumber === 4 || drawingNumber === 7 || drawingNumber === 10 || drawingNumber === 13) {
            playerDrawingNumber = "One"
        } else if (drawingNumber === 2 || drawingNumber === 5 || drawingNumber === 8 || drawingNumber === 11 || drawingNumber === 14) {
            playerDrawingNumber = "Two"
        } else {
            playerDrawingNumber = "Three"
        }
        return playerDrawingNumber
    }

    postDrawingData = () => {
        let playerNumberReturned = this.getNumberOfPlayer()
        let squiggleNumberReturned = this.getNumberOfDrawing()
        let fullRef = 'playersAndDrawings/player' + playerNumberReturned
        let squiggleName = 'squiggle' + squiggleNumberReturned
        var update = {};
        var drawingInfo = this.saveableCanvas.getSaveData()
        update[fullRef + "/" + squiggleName] = drawingInfo
        update[fullRef + "/playerColour"] = this.props.currentDrawColour
        return Firebase.database().ref().update(update);
    }

    postDrawingNumbers = () => {
        let fullRef = 'playersAndDrawings/numOfSquiggles'
        var update = {};
        update[fullRef] = this.props.drawingNumber
        console.log(this.props.drawingNumber + " is the drawing number")
        return Firebase.database().ref().update(update)
    }

    componentDidUpdate() {
        if (this.props.canDrawingBeSent === true) {
            this.postDrawingData()
            this.postDrawingNumbers()
            this.saveableCanvas.clear()
        }
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