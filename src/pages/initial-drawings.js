import React from 'react';
import Drawing from '../components/drawing';

class InitialDrawings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingNumber: 0,
            currentDrawColour: null,
            hasRedBeenChosen: true,
            hasBlueBeenChosen: true,
            hasGreenBeenChosen: true, 
            hasPurpleBeenChosen: true,
            hasOrangeBeenChosen: true,
            hasRedBeenUsed: false,
            hasBlueBeenUsed: false,
            hasGreenBeenUsed: false,
            hasPurpleBeenUsed: false,
            hasOrangeBeenUsed: false,
            canDrawingBeSent: false,
        };
    }

    changeDrawColour = (colour) => {
        if (colour === "red") {
            let drawColour = window.getComputedStyle(document.documentElement).getPropertyValue('--red-drawing-colour')
            this.setState({ currentDrawColour: drawColour })
        } else if (colour === "blue") {
            let drawColour = window.getComputedStyle(document.documentElement).getPropertyValue('--blue-drawing-colour')
            this.setState({ currentDrawColour: drawColour })
        } else if (colour === "green") {
            let drawColour = window.getComputedStyle(document.documentElement).getPropertyValue('--green-drawing-colour')
            this.setState({ currentDrawColour: drawColour })
        } else if (colour === "purple") {
            let drawColour = window.getComputedStyle(document.documentElement).getPropertyValue('--purple-drawing-colour')
            this.setState({ currentDrawColour: drawColour })
        } else if (colour === "orange") {
            let drawColour = window.getComputedStyle(document.documentElement).getPropertyValue('--orange-drawing-colour')
            this.setState({ currentDrawColour: drawColour })
        }
    }

    disableOtherColours = (colour) => {
        if (colour === "red") {
            this.setState({ hasBlueBeenChosen: false })
            this.setState({ hasGreenBeenChosen: false })
            this.setState({ hasPurpleBeenChosen: false })
            this.setState({ hasOrangeBeenChosen: false })
        } else if (colour === "blue") {
            this.setState({ hasRedBeenChosen: false })
            this.setState({ hasGreenBeenChosen: false })
            this.setState({ hasPurpleBeenChosen: false })
            this.setState({ hasOrangeBeenChosen: false })
        } else if (colour === "green") {
            this.setState({ hasRedBeenChosen: false })
            this.setState({ hasBlueBeenChosen: false })
            this.setState({ hasPurpleBeenChosen: false })
            this.setState({ hasOrangeBeenChosen: false })
        } else if (colour === "purple") {
            this.setState({ hasRedBeenChosen: false })
            this.setState({ hasBlueBeenChosen: false })
            this.setState({ hasGreenBeenChosen: false })
            this.setState({ hasOrangeBeenChosen: false })
        } else if (colour === "orange") {
            this.setState({ hasRedBeenChosen: false })
            this.setState({ hasBlueBeenChosen: false })
            this.setState({ hasGreenBeenChosen: false })
            this.setState({ hasPurpleBeenChosen: false })
        }
    }

    disableUsedColours = (colour) => {

    }
    
    getPlayerOrder = () => {
        let allPlayers = this.props.playerNames
        let playerName
        if (this.state.drawingNumber < 3) {
            playerName = allPlayers[0]
        } else if (this.state.drawingNumber < 6) {
            playerName = allPlayers[1]
        } else if (this.state.drawingNumber < 9) {
            playerName = allPlayers[2]
        } else if (this.state.drawingNumber < 12) {
            playerName = allPlayers[3]
        } else if (this.state.drawingNumber < 15) {
            playerName = allPlayers[4]
        } else if (this.state.drawingNumber < 18) {
            playerName = allPlayers[5]
        } else if (this.state.drawingNumber < 21) {
            playerName = allPlayers[6]
        } else if (this.state.drawingNumber < 24) { 
            playerName = allPlayers[7]
        }

        return playerName
    }

    getColourAsProp = () => {
        return this.state.currentDrawColour
    }

    incrementDrawings = () => {
        this.setState({ drawingNumber: this.state.drawingNumber + 1 })
        console.log(this.state.drawingNumber)
    }

    returnDrawingNumber = () => {
        return this.state.drawingNumber
    }

    drawingCanBePosted = (answer) => {
        return answer
    }

    stopDrawingPost = () => {
        setTimeout(() => { this.setState({ canDrawingBeSent: false }) }, 100);
    }

    render() {
        let colourToDraw = this.getColourAsProp()
        let getPlayerName = this.getPlayerOrder()
        let drawingNumber = this.returnDrawingNumber()
        return (
            <div className="inner-content">
                <div id="initial-drawing-main-text-holder">
                    <div className="header-and-button-holder">
                        <h3 className="header-text">It's time to draw, {getPlayerName}!</h3>
                    </div>
                    <h5 className="sub-header">Choose a colour below and start your initial doodle. The colour you pick will be yours for the entire game, so choose wisely.</h5>
                </div>
                <div>
                    <span className="dot" id= {(this.state.hasRedBeenChosen === true ? "red-dot" : "red-dot disabled" )} disabled={this.state.hasRedBeenChosen} onClick={() => {this.changeDrawColour("red"); this.disableOtherColours("red")}}></span>

                    <span className="dot" id= {(this.state.hasBlueBeenChosen === true ? "blue-dot" : "blue-dot disabled" )} disabled={this.state.hasBlueBeenChosen} onClick={() => {this.changeDrawColour("blue"); this.disableOtherColours("blue")}}
                    ></span>

                    <span className="dot" id= {(this.state.hasGreenBeenChosen === true ? "green-dot" : "green-dot disabled" )} disabled={this.state.hasGreenBeenChosen} onClick={() => {this.changeDrawColour("green"); this.disableOtherColours("green")}}></span>

                    <span className="dot" id= {(this.state.hasPurpleBeenChosen === true ? "purple-dot" : "purple-dot disabled" )} disabled={this.state.hasPurpleBeenChosen} onClick={() => {this.changeDrawColour("purple"); this.disableOtherColours("purple")}}></span>

                    <span className="dot" id= {(this.state.hasOrangeBeenChosen === true ? "orange-dot" : "orange-dot disabled" )} disabled={this.state.hasOrangeBeenChosen} onClick={() => {this.changeDrawColour("orange"); this.disableOtherColours("orange")}}></span>

                </div>
                <div className="canvas-holder">
                    <Drawing currentDrawColour={colourToDraw} drawingNumber={drawingNumber} canDrawingBeSent={this.drawingCanBePosted(this.state.canDrawingBeSent)}/>
                </div>
                <div className="button-holder">
                    <button onClick={() => {this.setState({ canDrawingBeSent: true}); this.incrementDrawings(); this.stopDrawingPost()}}>Next Drawing</button>
                </div>
            </div>
        )
    }
}

export default InitialDrawings;