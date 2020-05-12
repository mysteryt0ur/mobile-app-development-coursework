import React from 'react';
import logo from '../images/paint-splat.png'

class HomePage extends React.Component {

    render() {
        return (
            <div className="content-inner">
                <h1 className="header-text" id="home-page-header">Squibble</h1>
                <h2 className="header-text" id="home-page-tagline">The game where you quibble over your scribbles</h2>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        );
    }
}

export default HomePage;
