import React from 'react';
import CanvasDraw from "react-canvas-draw";
import Firebase from 'firebase'

class Drawing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingHeight: 280,
            drawingWidth: 280,
            brushSize: 3
        };
    }

    getNumberOfPlayer = () => {
        let playerNumber
        let drawingNumber = this.props.drawingNumber
        if (drawingNumber <= 3) {
            playerNumber = "One"
        } else if (drawingNumber <= 5) {
            playerNumber = "Two"
        } else if (drawingNumber <= 7) {
            playerNumber = "Three"
        } else if (drawingNumber <= 9) {
            playerNumber = "Four"
        } else {
            playerNumber = "Five"
        }
        return playerNumber
    }

    getNumberOfDrawing = () => {
        let playerDrawingNumber
        let drawingNumber = this.props.drawingNumber
        if (drawingNumber === 2 || drawingNumber === 4 || drawingNumber === 6 || drawingNumber === 8 || drawingNumber === 10) {
            playerDrawingNumber = "One"
        } else {
            playerDrawingNumber = "Two"
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

        if (squiggleNumberReturned === "One") {
            update[fullRef + "/playerColour"] = this.props.currentDrawColour
        }

        return Firebase.database().ref().update(update);
    }

    postDrawingNumbers = () => {
        let fullRef = 'playersAndDrawings/numOfSquiggles'
        var update = {};
        update[fullRef] = this.props.drawingNumber
        console.log(this.props.drawingNumber + " is the drawing number")
        return Firebase.database().ref().update(update)
    }

    getDrawingData = () => {
        let drawingDetails
        let drawingLocation = Firebase.database().ref('playersAndDrawings/playerThree/squiggleOne')
        drawingLocation.on("value", snapshot => {
            drawingDetails = snapshot.val()
        })
        return drawingDetails
    }

    postFinishedDrawing = () => {
        let drawingNumber
        let currentPlayer = this.props.currentPlayer
        let currentPlayers = this.props.playerNames
        let update = {};

        console.log(this.props.drawingNumber + " is the current drawing number")
        console.log(this.props.playerNames)

        if (this.props.drawingNumber <= currentPlayers.length) {
            drawingNumber = "drawingOne"
        } else {
            drawingNumber = "drawingTwo"
        }

        update['playersAndDrawings/' + currentPlayer + '/' + drawingNumber] = this.saveableCanvas.getSaveData();
        console.log(update + " is the update location")
        return Firebase.database().ref().update(update)
    }

    componentDidUpdate() {
        if (this.props.canDrawingBeSent === true) {
            this.postDrawingData()
            this.postDrawingNumbers()
            this.saveableCanvas.clear()
        }

        if (this.props.canFinalDrawingBeSent === true) {
            this.postFinishedDrawing()
        }
    }

    render() {
        return (
            <div>
                <div className="canvas-holder" id="canvas">
                {this.props.drawingTime === false &&
                <CanvasDraw className="canvas"  hideGrid ref={canvasDraw => (this.saveableCanvas = canvasDraw)} 
                    canvasWidth={this.state.drawingWidth}
                    canvasHeight={this.state.drawingHeight}
                    brushColor={this.props.currentDrawColour}
                    brushRadius={this.state.brushSize}/>
                }
                {this.props.drawingTime === true &&
                <CanvasDraw loadTimeOffset={5} hideGrid ref={canvasDraw => (this.saveableCanvas = canvasDraw)} 
                    canvasWidth={this.state.drawingWidth}
                    canvasHeight={this.state.drawingHeight}
                    brushColor={this.props.currentDrawColour}
                    brushRadius={this.state.brushSize}
                    saveData={this.getDrawingData()}/>
                }
                </div>
            </div>
        )
    }
}

export default Drawing;