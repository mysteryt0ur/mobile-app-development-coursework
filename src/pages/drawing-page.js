import React from 'react';
import Drawing from '../components/drawing'
import Firebase from 'firebase'
import Clock from '../images/alarm-clock.png'
import Paintbrush from '../images/cartoon-paintbrush.png'
import Celebrate from '../images/celebrate.png'

class DrawingAndRatingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingNumber: 1,
            currentDrawColour: "white",
            chosenWords: [],
            isUserReady: false,
            secondsLeft: 20,
            canFinalDrawingBeSent: false,
            timeToRate: false,
            winnerTime: false,
            shouldTopButtonsDisable: false,
            shouldBottomButtonsDisable: false,
            playerOneScore: 0,
            playerTwoScore: 0,
            playerThreeScore: 0,
            playerFourScore: 0,
            playerFiveScore: 0,
        };
    }

    decidePlayerOrder = (drawingNumber) => {
        let namesOfPlayers = this.props.playerNames
        let possiblePlayers = ["playerOne", "playerTwo", "playerThree","playerFour", "playerFive"]
        let numOfPlayers = namesOfPlayers.length
        let whoIsPlaying
        if (drawingNumber <= numOfPlayers) {
            if (possiblePlayers[drawingNumber - 1] < 0) {
                whoIsPlaying = possiblePlayers[numOfPlayers - 1]
            } else {
            whoIsPlaying = possiblePlayers[drawingNumber - 1]
            }
        } else if (possiblePlayers[drawingNumber - 1] < 0) {
            whoIsPlaying = possiblePlayers[numOfPlayers - 1] 
            } else {
            whoIsPlaying = possiblePlayers[drawingNumber - numOfPlayers - 1]
        } 

        return whoIsPlaying
    }

    getPlayerName = (currentPlayer) => {
        let currentPlayerName
        let database = Firebase.database().ref('playersAndDrawings/' + this.props.playerId + '/' + currentPlayer + '/playerName')
        database.on("value", snapshot => {
            currentPlayerName = snapshot.val()
        })

        return currentPlayerName
    }

    workOutNextPlayer = () => {
        let namesOfPlayers = this.props.playerNames
        let drawingNumber = this.state.drawingNumber
        let possiblePlayers = ["playerOne", "playerTwo", "playerThree","playerFour", "playerFive"]
        let numOfPlayers = namesOfPlayers.length
        let whoIsPlaying
        if (drawingNumber < numOfPlayers) {
            whoIsPlaying = possiblePlayers[drawingNumber]
        } else if (drawingNumber === numOfPlayers) {
            whoIsPlaying = possiblePlayers[0]
        } else if (drawingNumber === (numOfPlayers * 2)) {
            whoIsPlaying = possiblePlayers[0]
        } else {
            whoIsPlaying = possiblePlayers[drawingNumber - numOfPlayers]
        }

        return whoIsPlaying
        
    }

    getPlayerColour = (playerNumber) => {
        let colourHolder = []
        let returnedColour = Firebase.database().ref('playersAndDrawings/' + this.props.playerId + '/' + playerNumber + '/playerColour')
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
        console.log("drawing number should be heightened")
        this.setState({ drawingNumber: this.state.drawingNumber + 1 })
        this.setState({ secondsLeft: 20 })
    }

    returnPlayerNames = () => {
        return this.props.playerNames
    }

    returnPlayerIdProp = () => { 
        return this.props.playerId
    }

    getPreviousPlayerName = () => {
        return this.decidePlayerOrder(this.state.drawingNumber - 1)      
    }

    isDrawingNumberEven = () => {
        let isTheNumberEven = true
        if (this.state.drawingNumber === 1 || this.state.drawingNumber === 3 || this.state.drawingNumber === 5 || this.state.drawingNumber === 7 || this.state.drawingNumber === 9) {
            isTheNumberEven = false
        }

        return isTheNumberEven
    }

    itsTimeToRate = () => {
        this.setState({ timeToRate: true })
    }

    startDrawingAgain = () => {
        this.setState({ timeToRate: false })
        this.setState({ shouldTopButtonsDisable: false })
        this.setState({ shouldBottomButtonsDisable: false })
        this.newDrawing()
    }

    isGameOver = () => {
        let isTheGameOver = false
        if (this.state.drawingNumber === (this.props.playerNames.length * 2)) {
            isTheGameOver = true
        }

        return isTheGameOver
    }

    finishTheGame = () => {
        this.setState({ timeToRate: false })
        this.setState({ winnerTime: true })
    }

    sendRating = (score, playerNumber, topOrBottom) => {
        if (playerNumber === "playerOne") {
            this.setState({ playerOneScore: this.state.playerOneScore + score})
        } else if (playerNumber === "playerTwo") {
            this.setState({ playerTwoScore: this.state.playerOneScore + score})
        } else if (playerNumber === "playerThree") {
            this.setState({ playerThreeScore: this.state.playerThreeScore + score})
        } else if (playerNumber === "playerFour") {
            this.setState({ playerFourScore: this.state.playerFourScore + score})
        } else {
            this.setState({ playerFiveScore: this.state.playerFiveScore + score})
        }

        if (topOrBottom === "top") {
            this.setState({ shouldTopButtonsDisable: true })
        } else {
            this.setState({ shouldBottomButtonsDisable: true })
        }
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

        if (this.state.secondsLeft === 0) {
            this.vibrate();
        }
    }

    render() {
        let getPlayerName = this.decidePlayerOrder(this.state.drawingNumber)
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
                        <Drawing currentDrawColour={drawingColour} drawingNumber={this.state.drawingNumber} drawingTime={true} ratingTime={false} currentDoodler={this.workOutNextPlayer()} currentPlayer={getPlayerName} canFinalDrawingBeSent={this.drawingCanBePosted()} playerNames={this.returnPlayerNames()} playerId={this.returnPlayerIdProp()}/>
                        <div id="cartoon-icon">
                            <img src={Paintbrush} className="small-image" alt="cartoon-paintbrush"/>
                        </div>
                    </div>}
                </div>
            )
        } else if (this.state.timeToRate === true) {
            return (
                <div className="inner-content">
                    <div className="header-and-button-holder" id="rating-time">
                        <h3 className="header-text">It's time for the other players to rate! The word was: <i>{randomWord}</i></h3>
                        <div className="drawing-and-button-holder">
                            <Drawing currentDrawColour={drawingColour} drawingNumber={this.state.drawingNumber - 1} drawingTime={true} ratingTime={true} currentDoodler={this.workOutNextPlayer()} currentPlayer={this.getPreviousPlayerName()}  playerNames={this.returnPlayerNames()} playerId={this.returnPlayerIdProp()}/>
                        </div>
                        <div className="name-and-button-holder">
                            <div className="player-drawing-name"><h5><b>{this.getPlayerName(this.getPreviousPlayerName())}</b>'s drawing rating:</h5>
                            </div>
                            <div className="rating-buttons">
                                <button disabled={this.state.shouldTopButtonsDisable} className={this.state.shouldTopButtonsDisable === false ? "low-rating" : "disabled-button"} onClick={() => this.sendRating(1, this.getPreviousPlayerName(), "top")}>1</button>
                                <button disabled={this.state.shouldTopButtonsDisable} className={this.state.shouldTopButtonsDisable === false ? "med-rating" : "disabled-button"} onClick={() => this.sendRating(2, this.getPreviousPlayerName(), "top")}>2</button>
                                <button disabled={this.state.shouldTopButtonsDisable} className={this.state.shouldTopButtonsDisable === false ? "high-rating" : "disabled-button"} onClick={() => this.sendRating(3, this.getPreviousPlayerName(), "top")}>3</button> 
                            </div>
                        </div>
                        
                        <div className="drawing-and-button-holder">
                            <Drawing currentDrawColour={drawingColour} drawingNumber={this.state.drawingNumber} drawingTime={true} ratingTime={true} currentDoodler={this.workOutNextPlayer()} currentPlayer={getPlayerName} playerNames={this.returnPlayerNames()} playerId={this.returnPlayerIdProp()}/>
                        </div>
                        <div className="name-and-button-holder">
                            <div className="player-drawing-name"><h5><b>{this.getPlayerName(getPlayerName)}</b>'s drawing rating:</h5></div>
                            <div className="rating-buttons">
                                <button disabled={this.state.shouldBottomButtonsDisable} className={this.state.shouldBottomButtonsDisable === false ? "low-rating" : "disabled-button"} onClick={() => this.sendRating(1, getPlayerName, "bottom")}>1</button>
                                <button disabled={this.state.shouldBottomButtonsDisable} className={this.state.shouldBottomButtonsDisable === false ? "med-rating" : "disabled-button"} onClick={() => this.sendRating(2, getPlayerName, "bottom")}>2</button>
                                <button disabled={this.state.shouldBottomButtonsDisable} className={this.state.shouldBottomButtonsDisable === false ? "high-rating" : "disabled-button"} onClick={() => this.sendRating(3, getPlayerName, "bottom")}>3</button> 
                            </div>
                        </div>
                        {this.isGameOver() === false &&
                        <div>
                            <h5>Pass to <b>{this.getPlayerName(nextPlayer)}</b>, it's their turn next!</h5>
                            <button className={this.state.shouldBottomButtonsDisable === true && this.state.shouldTopButtonsDisable === true ? "normal-button" : "disabled-button"} id="rating-time-over" onClick={this.startDrawingAgain}>Start drawing again!</button>
                        </div>
                        }
                        {this.isGameOver() === true &&
                        <button id="rating-time-over" onClick={this.finishTheGame}>Click to see the final results!</button>
                        }
                    </div>
                </div>
            )
        } else if (this.state.winnerTime === true) {
            return (
                <div className="inner-content">
                    <h3>And the scores are...</h3>
                    {this.props.playerNames.length >= 3 &&
                    <div>
                        <h4>{this.props.playerNames[0]}: {this.state.playerOneScore} points</h4>
                        <h4>{this.props.playerNames[1]}: {this.state.playerTwoScore} points</h4>
                        <h4>{this.props.playerNames[2]}: {this.state.playerThreeScore} points</h4>
                    </div>
                    }
                    {this.props.playerNames.length >= 4 &&
                    <div>
                        <h4>{this.props.playerNames[3]}: {this.state.playerFourScore} points</h4>
                    </div>
                    }
                    {this.props.playerNames.length >= 5 &&
                    <div>
                        <h4>{this.props.playerNames[4]}: {this.state.playerFiveScore} points</h4>
                    </div>
                    }
                    <img src={Celebrate} className="big-image" alt="celebration-fireworks"/>
                    <button id="rating-time-over" onClick={() => window.location.reload()}>Play again?</button>
                </div>
            )
        } else {
            return (
                <div className="content-inner">
                    <img src={Clock} className="big-image" alt="times-up-alarm-clock"/>
                    {this.isDrawingNumberEven() === false &&
                        <div>
                            <h3>Times up! Pass to <b><span className="bold-name-text">{nextPlayerFull}</span></b></h3>
                            <h5 className="sub-header">Once you click the button below, your word to draw will appear and you will have 20 seconds to draw your scribble.</h5>
                            <button id="times-up-button" onClick={this.newDrawing}>I'm ready to draw!</button>
                        </div>
                    }
                    {this.isDrawingNumberEven() === true &&
                        <div>
                            <h3>Times up! It's now time to rate!</h3>
                            <h5 className="sub-header">Once you click the button below, your word to draw will appear and you will have 20 seconds to draw your scribble.</h5>
                            <button id="times-up-button" onClick={this.itsTimeToRate}>Rating time!</button>
                        </div>
                    }
                </div>
            )
        }
    }
}

export default DrawingAndRatingPage;