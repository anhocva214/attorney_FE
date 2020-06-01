import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux'


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RegisterCMS from './Components/RegisterCMS';
import Thanks from './Components/Thanks';

class App extends Component {

  display_register = ()=>{
    // console.log(this.props.display_register_page);
    if (this.props.display_register_page === true || this.props.display_register_page === undefined){
      return <RegisterCMS/>
    }
    else{
      return <Thanks/>
    }
  };

  render() {
    return (
      <div className="App">
        <ToastContainer/>
        <Router>
          <Switch>
            <Route exact path="/">
              {this.display_register()}
            </Route>
            {/* <Route path="/thanks">
              <Thanks />
            </Route> */}
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    display_register_page: state.display_register_page
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      // notification: (type_notifi, title_notifi, position) => {
      //     dispatch({type: "NOTIFICATION", type_notifi, title_notifi, position})
      // },
      // check_connect: () => {
      //     dispatch({type: "CHECK_CONNECT"})
      // }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)