import React from 'react';
import logo from './images/paint-splat.png'

class HomePage extends React.Component {
    render() {
        return (
            <div className="start-page">
                <h1 className="header-text" id="home-page-header">Welcome to <i></i></h1>
                <h2 className="header-text" id="home-page-tagline">The game with drawing and drinking, what could go wrong?</h2>
                <img src={logo} className="App-logo" alt="logo" />
                <p>Edit <code>src/App.js</code> and save to reload.</p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer">
                Learn React
                </a>
            </div>
        )
    }
}

export default HomePage;
