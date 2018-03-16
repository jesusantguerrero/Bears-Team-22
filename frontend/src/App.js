import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import AppHeader from './components/app/AppHeader';
import AppFooter from './components/appFooter/AppFooter';
import homeRoutes from './routes/homeRoutes'; 
import './assets/css/App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

// todo: pass this to redux?

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      headerClass: ''
    }

    // listen route changes to give the correct class to the header
    this.props.history.listen((location, action) => {
      this._checkRoute(location.pathname);
    })
  }

  render() {
    const { headerClass } = this.state;
    return (
      <div className="App">
        <AppHeader className={headerClass} />

        <Switch>
          { homeRoutes.map((route, index) => ( 
            <Route key={index} exact={route.exact} path={route.path} component={route.component}/> 
          )) } 
        </Switch>

        <AppFooter/>
      </div>
    );
  }

  // this change the style of the header depending if it's the homepage
  _checkRoute(pathname) {
    const headerClass = pathname === '/' ? 'home' : '';
    this.setState({ headerClass: headerClass });
  }
}

export default withRouter(App);
