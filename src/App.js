import React from 'react';
import './App.css';
import HomePage from './pages/home-page';
import InputNames from './pages/input-names';
import InitialDrawings from './pages/initial-drawings';
import DrawingAndRatingPage from './pages/drawing-page';
import Firebase from 'firebase'
import config from './firebase'

class App extends React.Component {
  constructor() {
    super();
    Firebase.initializeApp(config);
    this.state = {
      name: "React",
      buttonName: null,
      showHomePage: true,
      showInputNames: false,
      showInitialDrawings: false,
      showDrawingPage: false,
      playerId: null
    };
    this.hidePage = this.hidePage.bind(this);
  }

  getRandomLetterOrNumber = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 1; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getRandomId = () => {
    let id = ''
    for (let i = 0; i < 10; i++) {
      id += this.getRandomLetterOrNumber()
    }

    this.setState({ playerId: id })
  }

  getPlayerNames = () => {
    var finalNames = []
    let possibleNumbers = ["playerOne", "playerTwo", "playerThree", "playerFour", "playerFive"]
    for (let i = 0; i < 5; i++) {
        let getTable = Firebase.database().ref('/playersAndDrawings/' + this.state.playerId + '/' + possibleNumbers[i] + '/playerName');
        getTable.on("value", snapshot => {
            if (snapshot.val() !== null) {
                finalNames.push(snapshot.val().toString())
            }
        })
    }
    return finalNames
  }

  validatePlayerNames = () => {
    let answer = true
    let thePlayers = this.getPlayerNames()
    if (thePlayers.length >= 3) {
      answer = false
    }

    return answer
  }

  checkDrawingsCanBeDone = () => {
    let answer = false
    let amountOfPlayers = this.getPlayerNames().length
    let getData = Firebase.database().ref('playersAndDrawings/' + this.state.playerId + '/numOfSquiggles')
      getData.on("value", snapshot => {
        if (amountOfPlayers === 3 && snapshot.val() === 7) {
          answer = true
        } else if (amountOfPlayers === 4 && snapshot.val() === 9) {
          answer = true
        } else if (amountOfPlayers === 5 && snapshot.val() === 11) {
          answer = true
        }
      }
    )

    if (answer === true) {
      this.setState({ showInitialDrawings: false });
      this.setState({ showDrawingPage: true })
    }

    return answer
  }

  hidePage(name) {
    switch (name) {
      case "showHomePage":
        this.setState({ showHomePage: false });
        this.setState({ showInputNames: true })
        break;
      case "showInputNames":
        this.setState({ showInputNames: false });
        this.setState({ showInitialDrawings: true })
        break;
      case "showInitialDrawings":
        this.setState({ showInitialDrawings: false });
        this.setState({ showDrawingPage: true })
        break;
      case "showDrawingPage":
        this.setState({ showDrawingPage: false });
        this.setState({ showHomePage: true })
        break;
      default:
    }
  }

  componentDidMount() {
    setInterval(() => { 
      this.setState({ buttonName: "button-waiting"})
    }, 3000);

    setTimeout(() => {
      setInterval(() => { 
        this.setState({ buttonName: null })
      }, 3000);
    }, 1000);

    if (this.state.playerId === null) {
      this.getRandomId()
    }
  }

  componentDidUpdate() {
    if (this.state.showInitialDrawings === true) {
      this.checkDrawingsCanBeDone()
    }
  }

  render() {
    const { showHomePage, showInputNames, showInitialDrawings, showDrawingPage } = this.state;
    let getPlayerNames = this.getPlayerNames()

    return (
      <div className="content">
        {showHomePage && <HomePage />}
        {showInputNames && <InputNames playerId={this.state.playerId}/>}
        {showInitialDrawings && <InitialDrawings playerNames={getPlayerNames} playerId={this.state.playerId}/>}
        {showDrawingPage && <DrawingAndRatingPage playerNames={getPlayerNames} playerId={this.state.playerId}/>}
        {this.state.showHomePage === true &&
        <button className={this.state.buttonName} onClick={() => this.hidePage("showHomePage")}>Get started!</button> }
        {this.state.showInputNames === true && this.validatePlayerNames() === true &&
        <button className="disabled-button" disabled={this.validatePlayerNames }onClick={() => { this.hidePage("showInputNames")}}>Lets go!</button>}
        {this.state.showInputNames === true && this.validatePlayerNames() === false &&
        <button onClick={() => { this.hidePage("showInputNames")}}>Lets go!</button>}
        {this.state.showInitialDrawings === true}
        {this.state.showDrawingPage === true}
      </div>
    );
  }
}

export default App;
