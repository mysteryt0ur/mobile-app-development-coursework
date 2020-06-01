import React from 'react';

class DrawingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingNumber: 1,
            currentDrawColour: "white",
            hasRedBeenChosen: false,
            hasBlueBeenChosen: false,
            hasGreenBeenChosen: false, 
            hasPurpleBeenChosen: false,
            hasOrangeBeenChosen: false,
            hasRedBeenUsed: false,
            hasBlueBeenUsed: false,
            hasGreenBeenUsed: false,
            hasPurpleBeenUsed: false,
            hasOrangeBeenUsed: false,
            canDrawingBeSent: false
        };
    }

    render() {
        return (
            <div className="inner-content">
                <div id="initial-drawing-main-text-holder">
                    <div className="header-and-button-holder">
                        <h3 className="header-text">It's time to draw, PAL!</h3>
                    </div>
                    <h5 className="sub-header">Choose a colour below and start your initial doodle. The colour you pick will be yours for the entire game, so choose wisely.</h5>
                </div>
                <div>
                </div>
            </div>
        )
    }
}

export default DrawingPage;