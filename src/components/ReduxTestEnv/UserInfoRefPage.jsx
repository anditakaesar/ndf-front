import React from 'react';
import { connect } from 'react-redux';
import { userLogout } from '../../actions/user.actions';

class UserInfoRefPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                    <h3>User Page</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="username" value={this.props.user.username} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control" id="email" value={this.props.user.email} />
                            </div>
                        </div>

                        <div className="form-group row">
                        <div className="col">
                            <button type="button" className="btn btn-danger btn-block" onClick={this.props.userLogout}>
                                Logout
                            </button>
                        </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoRefPage);