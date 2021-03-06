import React from 'react';
import Drawing from '../components/drawing';
import Paintbrush from '../images/cartoon-paintbrush.png'

class InitialDrawings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingNumber: 1,
            currentDrawColour: "white",
            hasRedBeenChosen: false,
            hasBlueBeenChosen: false,
            hasGreenBeenChosen: false, 
            hasPurpleBeenChosen: false,
            hasOrangeBeenChosen: false,
            hasRedBeenUsed: false,
            hasBlueBeenUsed: false,
            hasGreenBeenUsed: false,
            hasPurpleBeenUsed: false,
            hasOrangeBeenUsed: false,
            canDrawingBeSent: false,
            canTransitionBeShown: false,
        };
    }

    changeDrawColour = (colour) => {
        if (colour === "red") {
            let drawColour = window.getComputedStyle(document.documentElement).getPropertyValue('--red-drawing-colour')
            this.setState({ currentDrawColour: drawColour })
            this.setState({ hasRedBeenUsed: true })
        } else if (colour === "blue") {
            let drawColour = window.getComputedStyle(document.documentElement).getPropertyValue('--blue-drawing-colour')
            this.setState({ currentDrawColour: drawColour })
            this.setState({ hasBlueBeenUsed: true })
        } else if (colour === "green") {
            let drawColour = window.getComputedStyle(document.documentElement).getPropertyValue('--green-drawing-colour')
            this.setState({ currentDrawColour: drawColour })
            this.setState({ hasGreenBeenUsed: true })
        } else if (colour === "purple") {
            let drawColour = window.getComputedStyle(document.documentElement).getPropertyValue('--purple-drawing-colour')
            this.setState({ currentDrawColour: drawColour })
            this.setState({ hasPurpleBeenUsed: true })
        } else if (colour === "orange") {
            let drawColour = window.getComputedStyle(document.documentElement).getPropertyValue('--orange-drawing-colour')
            this.setState({ currentDrawColour: drawColour })
            this.setState({ hasOrangeBeenUsed: true })
        }
    }

    disableOtherColours = (colour) => {
        if (colour === "red") {
            this.setState({ hasRedBeenChosen: true })
        } else if (colour === "blue") {
            this.setState({ hasBlueBeenChosen: true })
        } else if (colour === "green") {
            this.setState({ hasGreenBeenChosen: true })
        } else if (colour === "purple") {
            this.setState({ hasPurpleBeenChosen: true })
        } else if (colour === "orange") {
            this.setState({ hasOrangeBeenChosen: true })
        }
    }

    // check that a colour has not been used by another player and change the draw colour if needed
    canColourBeUsed = (colour) => {
        let haveOtherColoursBeenUsed = this.checkOtherColourUse(colour)
        if (haveOtherColoursBeenUsed === false) {
            this.disableOtherColours(colour)
            this.changeDrawColour(colour)
        }
    }

    // once another player starts, all colours that have not yet been chosen should now be available to choose
    resetColourUse = () => {
        if (this.state.drawingNumber === 2 || this.state.drawingNumber === 4 || this.state.drawingNumber === 6 || this.state.drawingNumber === 8 || this.state.drawingNumber === 10) {
            this.setState({ hasRedBeenChosen: false })
            this.setState({ hasBlueBeenChosen: false })
            this.setState({ hasGreenBeenChosen: false })
            this.setState({ hasOrangeBeenChosen: false })
            this.setState({ hasPurpleBeenChosen: false })
            this.setState({ currentDrawColour: "white" })
        }
    }

    checkOtherColourUse = (colour) => {
        let haveOthersBeenUsed = true
        if (colour === "red" && this.state.hasBlueBeenChosen === false && this.state.hasGreenBeenChosen === false && this.state.hasOrangeBeenChosen === false && this.state.hasPurpleBeenChosen === false) {
            haveOthersBeenUsed = false
        } else if (colour === "blue" && this.state.hasRedBeenChosen === false && this.state.hasGreenBeenChosen === false && this.state.hasOrangeBeenChosen === false && this.state.hasPurpleBeenChosen === false) {
            haveOthersBeenUsed = false
        } else if (colour === "green" && this.state.hasRedBeenChosen === false && this.state.hasBlueBeenChosen === false && this.state.hasOrangeBeenChosen === false && this.state.hasPurpleBeenChosen === false) {
            haveOthersBeenUsed = false
        } else if (colour === "purple" && this.state.hasRedBeenChosen === false && this.state.hasBlueBeenChosen === false && this.state.hasOrangeBeenChosen === false && this.state.hasGreenBeenChosen === false) {
            haveOthersBeenUsed = false
        } else if (colour === "orange" && this.state.hasRedBeenChosen === false && this.state.hasBlueBeenChosen === false && this.state.hasPurpleBeenChosen === false && this.state.hasGreenBeenChosen === false) {
            haveOthersBeenUsed = false 
        }

        return haveOthersBeenUsed
    }
    
    getPlayerOrder = () => {
        let allPlayers = this.props.playerNames
        let playerName
        if (this.state.drawingNumber < 3) {
            playerName = allPlayers[0]
        } else if (this.state.drawingNumber < 5) {
            playerName = allPlayers[1]
        } else if (this.state.drawingNumber < 7) {
            playerName = allPlayers[2]
        } else if (this.state.drawingNumber < 9) {
            playerName = allPlayers[3]
        } else if (this.state.drawingNumber < 11) {
            playerName = allPlayers[4]
        }

        return playerName
    }

    getColourAsProp = () => {
        return this.state.currentDrawColour
    }

    incrementDrawings = () => {
        this.setState({ drawingNumber: this.state.drawingNumber + 1 })
    }

    returnDrawingNumber = () => {
        return this.state.drawingNumber
    }

    // return whether it is time for a drawing to be posted to the database
    drawingCanBePosted = (answer) => {
        return answer
    }

    // stop drawing details from being sent to the database
    stopDrawingPost = () => {
        setTimeout(() => { this.setState({ canDrawingBeSent: false }) }, 100);
    }

    isDrawingStillBlank = () => {
        let answer 
        if (this.state.currentDrawColour !== "white") {
            answer = false
        } else {
            answer = true
        }

        return answer
    }

    changeButtonLabel = () => {
        let answer = false
        let allPlayers = this.props.playerNames
        if (allPlayers.length === 3 && this.state.drawingNumber === 6) {
            answer = true
        } else if (allPlayers.length === 4 && this.state.drawingNumber === 8) { 
            answer = true
        } else if (allPlayers.length === 5 && this.state.drawingNumber === 10) {
            answer = true
        }

        return answer
    }

    startTransitionScreen = () => {
        setTimeout(() => { 
            this.setState({ canTransitionBeShown: true })
          }, 100);
    }

    returnPlayerIdProp = () => { 
        return this.props.playerId
    }

    render() {
        let colourToDraw = this.getColourAsProp()
        let getPlayerName = this.getPlayerOrder()
        let drawingNumber = this.returnDrawingNumber()
        let isTheDrawingBlank = this.isDrawingStillBlank()
        let canButtonBeChanged = this.changeButtonLabel()

        if (this.state.canTransitionBeShown === false) {
            return (
                <div className="inner-content">
                    <div id="initial-drawing-main-text-holder">
                        <div className="header-and-button-holder">
                            <h3 className="header-text">Let's start doodling <span className="bold-name-text">{getPlayerName}!</span></h3>
                        </div>
                        <h5 className="sub-header">Choose a colour below (this will be yours for the whole game) and draw your squiggle. Once done, click the button below to submit. Each player will draw two squiggles.</h5>
                    </div>
                    <div id="drawing-colours">
                        {this.state.hasRedBeenUsed === false &&
                        <span className="dot" id= {"red-dot"} onClick={() => this.canColourBeUsed("red")}></span>}

                        {this.state.hasBlueBeenUsed === false &&
                        <span className="dot" id= {"blue-dot"} onClick={() => this.canColourBeUsed("blue")}
                        ></span>}

                        {this.state.hasGreenBeenUsed === false &&
                        <span className="dot" id= {"green-dot"} onClick={() => this.canColourBeUsed("green")}></span>}

                        {this.state.hasPurpleBeenUsed === false &&
                        <span className="dot" id= {"purple-dot"} onClick={() => this.canColourBeUsed("purple")}></span>}

                        {this.state.hasOrangeBeenUsed === false &&
                        <span className="dot" id= {"orange-dot"} onClick={() => this.canColourBeUsed("orange")}></span>}

                    </div>
                    <div className="canvas-holder">
                        <Drawing currentDrawColour={colourToDraw} drawingNumber={drawingNumber} drawingTime={false} canDrawingBeSent={this.drawingCanBePosted(this.state.canDrawingBeSent)} playerId={this.returnPlayerIdProp()}/>
                    </div>
                    <div className="button-holder">

                        {canButtonBeChanged === false &&
                        <button disabled={isTheDrawingBlank} onClick={() => {this.setState({ canDrawingBeSent: true }); this.incrementDrawings(); this.resetColourUse(); this.stopDrawingPost()}}>Next Squiggle</button>}

                        {canButtonBeChanged === true && <button disabled={isTheDrawingBlank} id="start-drawing-button" onClick={() => {this.setState({ canDrawingBeSent: true }); this.incrementDrawings(); this.resetColourUse(); this.stopDrawingPost(); this.startTransitionScreen();}}>Submit Squiggle and Start Drawing!</button>}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="inner-content">
                    <div id="cartoon-icon">
                        <img src={Paintbrush} className="small-image" alt="cartoon-paintbrush"/>
                    </div>
                    <h3>Hold on a moment...</h3>
                    <div id="cartoon-icon">
                        <img src={Paintbrush} className="small-image" alt="cartoon-paintbrush"/>
                    </div>
                </div>
            )
        }
    }
}

export default InitialDrawings;