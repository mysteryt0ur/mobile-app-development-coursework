import React from 'react';
import './App.css';
import HomePage from './pages/home-page';
import InputNames from './pages/input-names';
import InitialDrawings from './pages/initial-drawings';
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
    };
    this.hidePage = this.hidePage.bind(this);
  }

  getPlayerNames = () => {
    var finalNames = []
    let possibleNumbers = ["playerOne", "playerTwo", "playerThree"]
    for (let i = 0; i < 8; i++) {
        let getTable = Firebase.database().ref('/playersAndDrawings/' + possibleNumbers[i] + '/playerName');
        getTable.on("value", snapshot => {
            if (snapshot.val() !== null) {
                finalNames.push(snapshot.val().toString())
            }
        })
    }
    return finalNames
  }

  hidePage(name) {
    console.log(name);
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
        this.setState({ showHomePage: true })
        break;
      default:
    }
  }

  componentDidMount() {
    setInterval(() => { this.setState({ buttonName: "button-waiting"})}, 3000);
  }

  render() {
    const { showHomePage, showInputNames, showInitialDrawings } = this.state;
    let getPlayerNames = this.getPlayerNames()
    return (
      <div className="content">
        {showHomePage && <HomePage />}
        {showInputNames && <InputNames />}
        {showInitialDrawings && <InitialDrawings playerNames={getPlayerNames}/>}
        {this.state.showHomePage === true &&
        <button className={this.state.buttonName} onClick={() => this.hidePage("showHomePage")}>Get started!</button> }
        {this.state.showInputNames === true &&
        <button onClick={() => { this.hidePage("showInputNames")}}>Lets Start!</button>}
        {this.state.showInitialDrawings === true &&
        <button onClick={() => this.hidePage("showInputNames")}>Hello</button> }
      </div>
    );
  }
}

export default App;
