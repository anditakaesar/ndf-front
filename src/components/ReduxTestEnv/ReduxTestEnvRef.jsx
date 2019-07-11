import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyUser } from '../../actions/user.actions';

import LoginRef from './LoginRef';
import ControlPage from './ControlPage';

import './ReduxTestEnvRef.css';

class MessageRef extends React.Component {

    showMessage() {
        if (this.props.message !== undefined) {
            return (
                <div className="alert alert-info msg-notif">
                    {this.props.message}
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.showMessage()}
            </React.Fragment>
        )
    }
}

class ReduxTestEnvRef extends React.Component {

    componentWillMount() {
        this.props.verifyUser();
    }

    isLoggedIn() { // function to chec user is authenticated
        if (this.props.user !== null) {
            if (this.props.user.isAuthenticated) {
                return <Route path='/' component={ControlPage} />
              } else {
                return <Redirect to='/login' />
              }
        } else {
            return <Redirect to='/login' />
        }
    }

    render() {
        return(
            <Router>
                <React.Fragment>
                    <div className="row text-center">
                        <h3 className="big-title">Redux Control Demo</h3>
                    </div>

                    {this.isLoggedIn()}
                    <Route path='/login' component={LoginRef} />

                    <div className="row text-center">
                        <MessageRef message={this.props.notifications[0]} />
                    </div>
                    
                    <div className="row">
                        &nbsp;
                    </div>
                </React.Fragment>
                
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        notifications: state.notifications
    };
}

function mapDispatchToProps(dispatch) {
    return {
        verifyUser: () => dispatch(verifyUser())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTestEnvRef);