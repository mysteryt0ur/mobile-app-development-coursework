import React from 'react';
import Drawing from '../components/drawing'
import Firebase from 'firebase'

class DrawingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingNumber: 1,
            currentDrawColour: "white",
            canDrawingBeSent: false,
            chosenWords: [],
            isUserReady: false,
            secondsLeft: 20
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
            this.setState({ secondsLeft: this.state.secondsLeft - 1})
        }, 1000)
    }

    returnRandomWord = (drawingNumber) => {
        let returningWord
        if (drawingNumber === 1 || drawingNumber === 3 || drawingNumber === 5 || drawingNumber === 7 || drawingNumber === 9) {
            returningWord = this.state.chosenWords[drawingNumber - 1]
        } else {
            returningWord = this.state.chosenWords[drawingNumber - 2]
        }

        console.log(returningWord)

        return returningWord
    }

    returnSecondsLeft = () => {
        return this.state.secondsLeft
    }

    vibrate = () => {
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
        navigator.vibrate([500]);
    }

    async componentDidMount () {
        let chosenWords = []
        const url = "https://random-word-api.herokuapp.com/word?number=10"
        const response = await fetch(url);
        const data = await response.json();
        for (let i = 0; i < 5; i++) {
            chosenWords.push(data[i])
        }
        this.setState({ chosenWords: chosenWords })
        console.log(data)
        console.log(this.state.chosenWords)
    }

    render() {
        let getPlayerName = this.decidePlayerOrder()
        let drawingColour = this.getPlayerColour(getPlayerName)
        let randomWord = this.returnRandomWord(this.state.drawingNumber)

        if (this.state.secondsLeft !== 0) {
            return (
                <div className="inner-content">
                    <div id="initial-drawing-main-text-holder">
                        <div className="header-and-button-holder">
                            <h3 className="header-text">It's time to draw, {getPlayerName}</h3>
                        </div>
                        <h5 className="sub-header">Once you click the button below, your word to draw will appear and you will have 15 seconds to draw your scribble.</h5>
                    </div>
                    {this.state.isUserReady === false &&
                    <div>
                        <button onClick={() => this.userIsReady()}>I'm ready!</button>
                    </div>
                    }
                    {this.state.isUserReady === true && 
                    <div className="canvas-holder">
                        <h2>{randomWord} - Timer: {this.returnSecondsLeft()}</h2>
                        <Drawing currentDrawColour={drawingColour} drawingTime={true}/>
                    </div>}
                </div>
            )
        } else {
            this.vibrate();
            return (
                <div>howdy</div>
            )
        }
    }
}

export default DrawingPage;