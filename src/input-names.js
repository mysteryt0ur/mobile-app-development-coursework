import React from 'react';

class InputNames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfPlayers: 3,
            playerOne: '',
            playerTwo: '',
            playerThree: '',
            playerFour: '',
            playerFive: '',
            playerSix: '',
            playerSeven: '',
            playerEight: '',
        };

        this.handleNames = this.handleNames.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    increasePlayers = () => {
        this.setState({ numOfPlayers: this.state.numOfPlayers + 1})
        console.log(this.state.numOfPlayers)
    }

    handleNames = (event) => {
        this.setState({ [event.target.id]: event.target.value});
    }
    
    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        if (this.state.numOfPlayers === 3) {
            return (
                <div className="content">
                    <h2 className="header-text">First of all, who is playing?</h2>
                    <h3 className="sub-header">Please can you input the names of all the players below.</h3>
                    <h4 className="sub-header-two">You need at least 3 players for this game. You can play with up to 8 players.</h4>
                    <form onSubmit={this.handleSubmit}>
                        <textarea value={this.state.playerOne} id="playerOne" onChange={this.handleNames} />
                        <textarea value={this.state.playerTwo} id="playerTwo" onChange={this.handleNames} />
                        <textarea value={this.state.playerThree} id="playerThree" onChange={this.handleNames} />
                    </form>
                    <button onClick={this.increasePlayers}>Add extra player</button>
                    <input type="submit" value="Submit" />
                </div>
            )
        } else if (this.state.numOfPlayers === 4) {
            return (
                <div className="content">
                    <h2 className="header-text">First of all, who is playing?</h2>
                    <h3 className="sub-header">Please can you input the names of all the players below.</h3>
                    <h4 className="sub-header-two">You need at least 3 players for this game. You can play with up to 8 players.</h4>
                    <form onSubmit={this.handleSubmit}>
                        <textarea value={this.state.playerOne} id="playerOne" onChange={this.handleNames} />
                        <textarea value={this.state.playerTwo} id="playerTwo" onChange={this.handleNames} />
                        <textarea value={this.state.playerThree} id="playerThree" onChange={this.handleNames} />
                        <textarea value={this.state.playerFour} id="playerFour" onChange={this.handleNames} />
                    </form>
                    <button onClick={this.increasePlayers}>Add extra player</button>
                    <input type="submit" value="Submit" />
                </div>
            )
        }
    }
}

export default InputNames;
