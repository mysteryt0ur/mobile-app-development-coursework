import React from 'react';
import logo from './images/paint-splat.png'
import InputNames from './input-names';

class HomePage extends React.Component {

    state = {
        isActive: true
    }

    handleHide = () => {
        this.setState({
            isActive: false
        })
    }

    render() {
        if (this.state.isActive) {
            return (
                <div className="content">
                    <h1 className="header-text" id="home-page-header">Welcome to <i></i></h1>
                    <h2 className="header-text" id="home-page-tagline">The game with drawing and drinking, what could go wrong?</h2>
                    <img src={logo} className="App-logo" alt="logo" />
                    <button onClick={this.handleHide}>Get started!</button>
                </div>
            );
        } else {
            return (
                <InputNames />
            )
        }
    }
}

export default HomePage;
