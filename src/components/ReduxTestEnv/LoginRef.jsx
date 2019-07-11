import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogin } from '../../actions/user.actions';

class LoginRef extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        }
    }

    _handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    _handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    _handleLoginButton = (event) => {
        let payload = {
            username: this.state.username,
            password: this.state.password,
        }

        const { user } = this.props;
        
        this.props.userLogin({user: payload });
        
        if (user && user.isAuthenticated) {
            this.setState({
                redirectToReferrer: true
            });
        } else {
            this.clearFields();
        }
    }

    clearFields() {
        this.setState({
            username: '', password: ''
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;
        const { user } = this.props;
    
        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        if (user && user.isAuthenticated) {
            return <Redirect to='/' />
        }

        return (
            <div className="row text-center">
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <input className="form-control" type="text" placeholder="username" value={this.state.username} onChange={this._handleUsernameChange} required autoFocus></input>
                    <input className="form-control" type="password" placeholder="password" value={this.state.password} onChange={this._handlePasswordChange}></input>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this._handleLoginButton}>Sign in</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userLogin: user => dispatch(userLogin(user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRef);