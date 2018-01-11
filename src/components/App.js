import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import FixedMenu from '../containers/FixedMenu';
import HomePageLayout from '../containers/HomePageLayout';
import JavaScript from './Javascript';
import FlashPage from '../containers/FlashPage';


class App extends Component {
  componentDidMount() {
     this.props.fetchUser();
     console.log('this.props.fetchUser()', this.props.fetchUser());
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <FixedMenu />
            <Route exact path="/" component={HomePageLayout} />

            {/* <Route exact path="/currentUser" component={CurrentUser} /> */}
            <Route exact path="/javascript" component={JavaScript} />
            <Route path="/flashPage" component={FlashPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);