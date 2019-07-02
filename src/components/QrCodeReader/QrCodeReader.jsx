import React from 'react';
import QrReader from 'react-qr-reader'
import './QrCodeReader.css';

class QrCodeReader extends React.Component {
    constructor() {
        super();
        this.state = {
            result: 'No result',
            isFound: false,
        }
    }

    handleScan = data => {
        if (data) {
            this.setState({
                result: data,
                isFound: true
            });
        }
    }

    returnStyle() {
        if (this.state.isFound) {
            return {
                'display': 'none'
            }
        } else {
            return {
                'display': 'inline'
            }
        }
    }

    handleError = err => {
        console.error(err);
    }

    handleBeginScan = () => {
        this.setState({
            isFound: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="reader-container">
                    <QrReader 
                        ref="test"
                        delay={500} 
                        onError={this.handleError} 
                        onScan={this.handleScan} />
                </div>
                <p>{this.state.result}</p>
                <button onClick={this.handleBeginScan}>Begin Scan</button>
            </React.Fragment>
        );
    }
}

export default QrCodeReader;