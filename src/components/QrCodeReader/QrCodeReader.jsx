import React from 'react';

class QrCodeReader extends React.Component {

    handleOpenWindow = () => {
        console.log(`Clicked`);
    }

    render() {
        return <button onClick={this.handleOpenWindow}>Open Window</button>
    }
}

export default QrCodeReader;