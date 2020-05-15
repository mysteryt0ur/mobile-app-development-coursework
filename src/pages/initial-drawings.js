import React from 'react';
import Drawing from '../components/drawing';

class InitialDrawings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingNumber: 1,
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

    getColourAsProp = () => {
        return this.state.currentDrawColour
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
    
    // getRandomPlayer = () => {
    //     let numOfPlayers = this.playerNames.length
    //     console.log(numOfPlayers)
    //     let randomPlayer = Math.floor(Math.random() * 4) + 1  

    //     console.log(randomPlayer)
    // }


    incrementDrawings = () => {
        this.setState({ drawingNumber: this.state.drawingNumber + 1 })
    }

    // componentDidMount() {
    //     this.getRandomPlayer()
    // }

    render() {
        let colourToDraw = this.getColourAsProp()
        return (
            <div className="inner-content">
                <div id="initial-drawing-main-text-holder">
                    <div className="header-and-button-holder">
                        <h3 className="header-text">It's time to draw, {this.props.playerNames[0]}!</h3>
                    </div>
                    <h5 className="sub-header">Choose a colour below and start your initial doodle. The colour you pick will be yours for the entire game, so choose wisely.</h5>
                </div>
                <div>
                    <span className="dot" id= {(this.state.hasRedBeenChosen === true ? "red-dot" : "red-dot disabled" )} disabled={this.state.hasRedBeenChosen} onClick={() => {this.changeDrawColour("red"); this.disableOtherColours("red")}}></span>

                    <span className="dot" id= {(this.state.hasBlueBeenChosen === true ? "blue-dot" : "blue-dot disabled" )} onClick={() => {this.state.hasBlueBeenChosen === true && this.changeDrawColour("blue")}}
                    ></span>
                    <span className="dot" id= {(this.state.hasGreenBeenChosen === true ? "green-dot" : "green-dot disabled" )}  onClick={() => this.changeDrawColour("green")} ></span>
                    <span className="dot" id= {(this.state.hasPurpleBeenChosen === true ? "purple-dot" : "purple-dot disabled" )}  onClick={() => this.changeDrawColour("purple")} ></span>
                    <span className="dot" id= {(this.state.hasOrangeBeenChosen === true ? "orange-dot" : "orange-dot disabled" )} onClick={() => this.changeDrawColour("orange")} ></span>
                </div>
                <div className="canvas-holder">
                    <Drawing currentDrawColour={colourToDraw}/>
                </div>
                <div className="button-holder">
                    <button onClick={() => { localStorage.setItem("savedDrawing", this.saveableCanvas.getSaveData());
                    console.log(localStorage);
                    //setTimeout(() => { this.saveableCanvas.undo(); }, 1000);
                    setTimeout(function(){ console.log(localStorage + "hello" + localStorage.length) }, 1000)}
                    }>Next Drawing</button>
                </div>
            </div>
        )
    }
}

export default InitialDrawings;