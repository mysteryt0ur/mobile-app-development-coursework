import React from 'react';


class InputNames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfPlayers: 3,
            players: ["", "", "", "", "", "", "", ""]
        };

        this.addNames = this.addNames.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    increasePlayers = () => {
        if (this.state.numOfPlayers < 8) {
            this.setState({ numOfPlayers: this.state.numOfPlayers + 1})
        }
    }

    decreasePlayers = () => {
        if (this.state.numOfPlayers > 3) {
            this.setState({ numOfPlayers: this.state.numOfPlayers - 1})
        }
    }

    addNames = (event) => {
        let playerSplit = this.state.players.slice()
        let boxIdSplit = event.target.id.split("player").pop()
        playerSplit[boxIdSplit - 1] = event.target.value
        this.setState({players: playerSplit});
    }

    checkNames = () => {
        let areNamesReady = true
        for (let i = 0; i < this.state.numOfPlayers; i++) {
            if (this.state.players[i] === "") {
                areNamesReady = false
                break;
            }
        } return areNamesReady
    }
    
    handleSubmit = (event) => {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="inner-content">
                <div className="main-text-holder">
                    <div className="header-and-button-holder">
                        <h3 className="header-text">Who is playing?</h3>
                    </div>
                    <h5 className="sub-header">Enter the players names below. You need at least 3 players for this game. You can play with up to 8 players.</h5>
                </div>
                <div id="text-input-holder">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.players[0]} id="player1" onChange={this.addNames} />
                        <input type="text" value={this.state.players[1]} id="player2" onChange={this.addNames} />
                        <input type="text" value={this.state.players[2]} id="player3" onChange={this.addNames} />
                        {this.state.numOfPlayers >= 4 &&
                            <input type="text" value={this.state.players[3]} id="player4" onChange={this.addNames} />
                        }
                        {this.state.numOfPlayers >= 5 &&
                            <input type="text" value={this.state.players[4]} id="player5" onChange={this.addNames} />
                        }
                        {this.state.numOfPlayers >= 6 &&
                            <input type="text" value={this.state.players[5]} id="player6" onChange={this.addNames} />
                        }
                        {this.state.numOfPlayers >= 7 &&
                            <input type="text" value={this.state.players[6]} id="player7" onChange={this.addNames} />
                        }
                        {this.state.numOfPlayers >= 8 &&
                            <input type="text" value={this.state.players[7]} id="player8" onChange={this.addNames} />
                        }
                    </form>
                </div>
                <div className="button-holder">
                    <button onClick={this.increasePlayers}>Add player</button>
                    <button onClick={this.decreasePlayers}>Delete player</button>
                </div>
            </div>
        )
    }
}

export default InputNames;
