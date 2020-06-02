import React from 'react';
import Drawing from '../components/drawing'
import Firebase from 'firebase'
import Clock from '../images/alarm-clock.png'
import Paintbrush from '../images/cartoon-paintbrush.png'

class DrawingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingNumber: 1,
            currentDrawColour: "white",
            chosenWords: [],
            isUserReady: false,
            secondsLeft: 20,
            canFinalDrawingBeSent: false
        };
    }

    decidePlayerOrder = () => {
        let namesOfPlayers = this.props.playerNames
        let drawingNumber = this.state.drawingNumber
        let possiblePlayers = ["playerOne", "playerTwo", "playerThree","playerFour", "playerFive"]
        let numOfPlayers = namesOfPlayers.length
        let whoIsPlaying
        if (drawingNumber <= numOfPlayers) {
            whoIsPlaying = possiblePlayers[drawingNumber - 1]  
        } else {
            whoIsPlaying = possiblePlayers[drawingNumber - numOfPlayers]
        } 

        return whoIsPlaying
        
    }

    getPlayerName = (currentPlayer) => {
        let currentPlayerName
        let database = Firebase.database().ref('playersAndDrawings/' + currentPlayer + '/playerName')
        database.on("value", snapshot => {
            currentPlayerName = snapshot.val()
        })

        return currentPlayerName
    }

    workOutNextPlayer = () => {
        let lastPlayer = this.decidePlayerOrder()
        let nextPlayer
        if (lastPlayer === "playerOne") {
            nextPlayer = "playerTwo"
        } else if (lastPlayer === "playerTwo") {
            nextPlayer = "playerThree"
        } else if (lastPlayer === "playerThree") {
            nextPlayer = "playerFour"
        } else if (lastPlayer === "playerFour") {
            nextPlayer = "playerFive"
        } else {
            nextPlayer = "playerOne"
        }

        return nextPlayer
    }

    decideDoodleOrder = () => {
        let namesOfPlayers = this.props.playerNames
        let possiblePlayers = ["playerOne", "playerTwo", "playerThree","playerFour", "playerFive"]
        let numOfPlayers = namesOfPlayers.length
        let drawingNumber = this.props.drawingNumber
        let whoIsPlaying
        if (drawingNumber <= (numOfPlayers - 1)) {
            whoIsPlaying = possiblePlayers[drawingNumber + 1]  
        } else {
            whoIsPlaying = possiblePlayers[drawingNumber - (numOfPlayers - 1)]
        } 

        return whoIsPlaying
    }

    getPlayerColour = (playerNumber) => {
        let colourHolder = []
        let returnedColour = Firebase.database().ref('playersAndDrawings/' + playerNumber + '/playerColour')
        returnedColour.on("value", snapshot => {
            colourHolder.push(snapshot.val()) 
        })
    
        return colourHolder[0]
    }

    userIsReady = () => {
        this.setState({ isUserReady: true })
            setInterval(() => {
            if (this.state.secondsLeft >= 1) {
                this.setState({ secondsLeft: this.state.secondsLeft - 1})
            }
        }, 1000)
        console.log("i've beeen run")
    }

    returnRandomWord = (drawingNumber) => {
        let returningWord

        if (this.state.isUserReady === true) {
            if (drawingNumber === 1 || drawingNumber === 3 || drawingNumber === 5 || drawingNumber === 7 || drawingNumber === 9) {
                returningWord = this.state.chosenWords[drawingNumber - 1]
            } else {
                returningWord = this.state.chosenWords[drawingNumber - 2]
            }
        }

        return returningWord
    }

    returnSecondsLeft = () => {
        return this.state.secondsLeft
    }

    vibrate = () => {
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
        navigator.vibrate([500]);
    }

    startDrawingSend = () => {
        this.setState({ canFinalDrawingBeSent: true })
    }

    drawingCanBePosted = () => {
        return this.state.canFinalDrawingBeSent
    }

    pushChosenWords = (words) => {
        let chosenWords = []
        if (this.state.drawingNumber === 1 && this.state.secondsLeft === 20) {
            for (let i = 0; i < 5; i++) {
                chosenWords.push(words[i])
            }
            this.setState({ chosenWords: chosenWords })
        }
    }

    newDrawing = () => {
        this.setState({ drawingNumber: this.state.drawingNumber + 1 })
        this.setState({ secondsLeft: 20 })
    }

    async componentDidMount () {
        const url = "https://random-word-api.herokuapp.com/word?number=5"
        const response = await fetch(url);
        const data = await response.json();
        this.pushChosenWords(data)
        this.setState({ isUserReady: false })
        this.setState({ canFinalDrawingBeSent: false })
    }

    componentDidUpdate() { 
        if (this.state.secondsLeft === 1) {
            setTimeout(() => {
                this.startDrawingSend();
            }, 990)   
        }
    }

    render() {
        let getPlayerName = this.decidePlayerOrder()
        let drawingColour = this.getPlayerColour(getPlayerName)
        let randomWord = this.returnRandomWord(this.state.drawingNumber)
        let nextPlayer = this.workOutNextPlayer()
        let nextPlayerFull = this.getPlayerName(nextPlayer)

        if (this.state.secondsLeft !== 0) {
            return (
                <div className="inner-content">
                    <div className="header-and-button-holder">
                        <h3 className="header-text">It's time to draw, <span className="bold-name-text">{this.getPlayerName(getPlayerName)}!</span></h3>
                    </div>
                    {this.state.isUserReady === false &&
                    <div>
                        <h5 className="sub-header" id="drawing-desc">Once you click the button below, your word to draw will appear and you will have 20 seconds to draw your scribble.</h5>
                        <button onClick={this.userIsReady}>I'm ready!</button>
                    </div>
                    }
                    {this.state.isUserReady === true && 
                    <div className="canvas-holder">
                        <div id="drawing-info">
                            <h3>Your word is: <i>{randomWord}</i></h3>
                            <h3>Time left: <span id="timer-time">{this.returnSecondsLeft()}</span></h3>
                        </div>
                        <Drawing currentDrawColour={drawingColour} drawingNumber ={this.props.drawingNumber} drawingTime={true} currentPlayer={getPlayerName} canFinalDrawingBeSent={this.drawingCanBePosted()} playerNames={this.props.playerNames}/>
                        <div id="cartoon-icon">
                            <img src={Paintbrush} className="small-image" alt="cartoon-paintbrush"/>
                        </div>
                    </div>}
                </div>
            )
        } else {
            this.vibrate();
            return (
                <div className="content-inner">
                    <img src={Clock} className="big-image" alt="times-up-alarm-clock"/>
                    <div>
                        <h3>Times up! Pass to <b><span className="bold-name-text">{nextPlayerFull}</span></b></h3>
                        <h5 className="sub-header">Once you click the button below, your word to draw will appear and you will have 20 seconds to draw your scribble.</h5>
                    </div>
                    <div>
                        <button id="times-up-button" onClick={this.newDrawing}>I'm ready to draw!</button>
                    </div>
                </div>
            )
        }
    }
}

export default DrawingPage;