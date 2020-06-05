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

    // used to post players initial squiggles to the database
    postDrawingData = () => {
        let playerNumberReturned = this.getNumberOfPlayer()
        let squiggleNumberReturned = this.getNumberOfDrawing()
        let fullRef = 'playersAndDrawings/' + this.props.playerId + '/player' + playerNumberReturned
        let squiggleName = 'squiggle' + squiggleNumberReturned
        var update = {};
        var drawingInfo = this.saveableCanvas.getSaveData()
        update[fullRef + "/" + squiggleName] = drawingInfo

        if (squiggleNumberReturned === "One") {
            update[fullRef + "/playerColour"] = this.props.currentDrawColour
        }

        return Firebase.database().ref().update(update);
    }

    // post what number of drawing this is to the database
    postDrawingNumbers = () => {
        let fullRef = 'playersAndDrawings/' + this.props.playerId + '/numOfSquiggles'
        var update = {};
        update[fullRef] = this.props.drawingNumber
        return Firebase.database().ref().update(update)
    }

    getDrawingData = (ratingTimePlayer) => {
        let drawingDetails
        let squiggleNumber
        let drawingLocation
        let fullRef
        let nextDoodle = this.props.currentDoodler
        let currentPlayers = this.props.playerNames
        
        if (this.props.ratingTime === false) {
            if (this.props.drawingNumber <= currentPlayers.length) {
                squiggleNumber = "squiggleOne"
            } else {
                squiggleNumber= "squiggleTwo"
            }

            fullRef = 'playersAndDrawings/' + this.props.playerId + '/' + nextDoodle + '/' + squiggleNumber
            drawingLocation = Firebase.database().ref(fullRef)

        } else if (this.props.ratingTime === true) {
            if (this.props.drawingNumber <= currentPlayers.length) {
                squiggleNumber = "drawingOne"
            } else {
                squiggleNumber= "drawingTwo"
            }

            fullRef = 'playersAndDrawings/' + this.props.playerId + '/' + ratingTimePlayer + '/' + squiggleNumber
            drawingLocation = Firebase.database().ref(fullRef)

        }

            drawingLocation.on("value", snapshot => {
                drawingDetails = snapshot.val()
            })

        return drawingDetails
    }

    // used to post players final drawing to the database
    postFinishedDrawing = () => {
        let drawingNumber
        let currentPlayer = this.props.currentPlayer
        let currentPlayers = this.props.playerNames
        let update = {};

        if (this.props.drawingNumber <= currentPlayers.length) {
            drawingNumber = "drawingOne"
        } else {
            drawingNumber = "drawingTwo"
        }

        update['playersAndDrawings/' + this.props.playerId + '/' + currentPlayer + '/' + drawingNumber] = this.saveableCanvas.getSaveData();
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
                <div>
                    {this.props.drawingTime === false &&
                    <div id="canvas">
                        <CanvasDraw className="canvas"  hideGrid ref={canvasDraw => (this.saveableCanvas = canvasDraw)} 
                            canvasWidth={this.state.drawingWidth}
                            canvasHeight={this.state.drawingHeight}
                            brushColor={this.props.currentDrawColour}
                            brushRadius={this.state.brushSize}/>
                    </div>
                    }
                    {this.props.drawingTime === true && this.props.ratingTime === false &&
                    <div id="canvas">
                        <CanvasDraw loadTimeOffset={0} hideGrid ref={canvasDraw => (this.saveableCanvas = canvasDraw)} 
                        canvasWidth={this.state.drawingWidth}
                        canvasHeight={this.state.drawingHeight}
                        brushColor={this.props.currentDrawColour}
                        brushRadius={this.state.brushSize}
                        saveData={this.getDrawingData()}/>
                    </div>
                    }
                </div>
                <div>
                    {this.props.drawingTime === true && this.props.ratingTime === true &&
                    <div id="canvas-rate">
                        <CanvasDraw loadTimeOffset={5} disabled hideGrid ref={canvasDraw => (this.loadableCanvas = canvasDraw)} 
                        canvasWidth={this.state.drawingWidth - 80}
                        canvasHeight={this.state.drawingHeight - 80}
                        brushColor={this.props.currentDrawColour}
                        brushRadius={this.state.brushSize}
                        saveData={this.getDrawingData(this.props.currentPlayer)}/>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default Drawing;