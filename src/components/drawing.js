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
        if (drawingNumber < 4) {
            playerNumber = "One"
        } else if (drawingNumber <  7) {
            playerNumber = "Two"
        } else if (drawingNumber < 10) {
            playerNumber = "Three"
        } else if (drawingNumber < 13) {
            playerNumber = "Four"
        }
        return playerNumber
    }

    getNumberOfDrawing = () => {
        let playerDrawingNumber
        let drawingNumber = this.props.drawingNumber
        console.log(drawingNumber + " this is the drawing Number")
        if (drawingNumber === 1 || drawingNumber === 4 || drawingNumber === 7 || drawingNumber === 10 || drawingNumber === 13 || drawingNumber === 16 || drawingNumber === 19 || drawingNumber === 22) {
            playerDrawingNumber = "One"
        } else if (drawingNumber === 2 || drawingNumber === 5 || drawingNumber === 8 || drawingNumber === 11 || drawingNumber === 14 || drawingNumber === 17 || drawingNumber === 20 || drawingNumber === 23) {
            playerDrawingNumber = "Two"
        } else {
            playerDrawingNumber = "Three"
        }

        console.log(playerDrawingNumber + "this is the drawing number after") 
        return playerDrawingNumber
    }

    postDrawingData = (drawingInfo) => {
        let playerNumberReturned = this.getNumberOfPlayer()
        let squiggleNumberReturned = this.getNumberOfDrawing()
        let fullRef = 'playersAndDrawings/player' + playerNumberReturned
        let squiggleName = 'squiggle' + squiggleNumberReturned
        console.log(squiggleNumberReturned + " squiggle number")
        var update = {};
        update[fullRef + "/" + squiggleName] = drawingInfo
        return Firebase.database().ref().update(update);
    }

    componentDidUpdate() {
        console.log("update does work")
        console.log(this.props.canDrawingBeSent)
        console.log(this.props.drawingNumber + "is the drawing number")
        if (this.props.canDrawingBeSent === true) {
            this.postDrawingData(this.saveableCanvas.getSaveData())
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