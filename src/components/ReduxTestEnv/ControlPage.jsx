import React from 'react';
import {
    Link,
    Route
} from 'react-router-dom';
import UserInfoRef from './UserInfoRef';
import StoreControl from './StoreControl';
import MemberControl from './MemberControl';
import UserInfoRefPage from './UserInfoRefPage';

class NavigationBar extends React.Component {
    render() {
        return (
            <header className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">Control Page</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to='/store'>Store List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/member'>Member List</Link>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link">Admin List</div>
                    </li>
                </ul>
                
                <ul className="navbar-nav ml-auto">
                    <UserInfoRef />
                </ul>
            </div>
            </nav>
            </header>
        );
    }
}

class ControlPage extends React.Component {
    render() {
        return (
            <React.Fragment>
            <NavigationBar />
            <main className="container">
                <Route path="/store" component={StoreControl} />
                <Route path="/member" component={MemberControl} />
                <Route path="/userprofile" component={UserInfoRefPage} />
            </main>
            </React.Fragment>
        )
    }
}

export default ControlPage;