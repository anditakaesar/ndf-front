import React from 'react';
import { connect } from 'react-redux';
import { userLogout } from '../../actions/user.actions';
import { Link } from 'react-router-dom';

class UserInfoRef extends React.Component {
    render() {
        const { username } = this.props.user;

        return(
            <React.Fragment>
                <div className="nav-item">
                    Hello, <Link to='/userprofile'>{username}</Link>! <button className="btn btn-danger" onClick={this.props.userLogout}>Logout</button>
                </div>
            </React.Fragment>
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
        userLogout: () => dispatch(userLogout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoRef);