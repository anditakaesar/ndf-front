import React from 'react';
import QrReader from 'react-qr-reader'
import './QrCodeReader.css';

class QrCodeReader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 'No result',
            isFound: false,
            isScan: false
        }
    }

    handleScan = data => {
        if (data) {
            this.setState({
                result: data,
                isFound: true
            });
            this.handleStopScan();
        }
    }

    handleError = err => {
        console.error(err);
    }

    handleBeginScan = () => {
        this.setState({
            isFound: false,
            isScan: true
        });
    }

    handleStopScan = () => {
        this.setState({
            isScan: false
        });
    }

    returnScanner() {
        const { handleError, handleScan } = this;
        return (
            <div className="reader-container">
                <QrReader
                    delay={500} 
                    onError={handleError} 
                    onScan={handleScan} />
            </div>
        );
    }

    render() {
        const { isScan } = this.state;
        let cameraReader = isScan ?  this.returnScanner()  : null;
        let buttonrender = isScan ? <button onClick={this.handleStopScan}>Stop Scan</button> : <button onClick={this.handleBeginScan}>Scan</button>;
        return (
            <React.Fragment>
                <input type='text' value={this.state.result}></input>
                {buttonrender}
                <div>{cameraReader}</div>
            </React.Fragment>
        );
    }
}

export default QrCodeReader;