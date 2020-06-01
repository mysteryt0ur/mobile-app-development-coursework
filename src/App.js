import React from 'react';
import './App.css';
import HomePage from './pages/home-page';
import InputNames from './pages/input-names';
import InitialDrawings from './pages/initial-drawings';
import DrawingPage from './pages/drawing-page';
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
      showDrawingPage: false
    };
    this.hidePage = this.hidePage.bind(this);
  }

  getPlayerNames = () => {
    var finalNames = []
    let possibleNumbers = ["playerOne", "playerTwo", "playerThree"]
    for (let i = 0; i < 5; i++) {
        let getTable = Firebase.database().ref('/playersAndDrawings/' + possibleNumbers[i] + '/playerName');
        getTable.on("value", snapshot => {
            if (snapshot.val() !== null) {
                finalNames.push(snapshot.val().toString())
            }
        })
    }
    return finalNames
  }

  refreshDatabase = () => {
    let database = Firebase.database().ref('playersAndDrawings/');
    database.remove()
  }

  checkDrawingsCanBeDone = () => {
    let answer = false
    let amountOfPlayers = this.getPlayerNames().length
    let getData = Firebase.database().ref('playersAndDrawings/numOfSquiggles')
      getData.on("value", snapshot => {
        if (amountOfPlayers === 3 && snapshot.val() === 7) {
          console.log("3 players has been met")
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
    console.log(name);
    switch (name) {
      case "showHomePage":
        this.setState({ showHomePage: false });
        this.setState({ showInputNames: true })
        this.refreshDatabase();
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
    setInterval(() => { this.setState({ buttonName: "button-waiting"})}, 3000);
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
        {showInputNames && <InputNames />}
        {showInitialDrawings && <InitialDrawings playerNames={getPlayerNames}/>}
        {showDrawingPage && <DrawingPage />}
        {this.state.showHomePage === true &&
        <button className={this.state.buttonName} onClick={() => this.hidePage("showHomePage")}>Get started!</button> }
        {this.state.showInputNames === true &&
        <button onClick={() => { this.hidePage("showInputNames")}}>Lets Start!</button>}
        {this.state.showInitialDrawings === true}
        {this.state.showDrawingPage === true}
      </div>
    );
  }
}

export default App;
