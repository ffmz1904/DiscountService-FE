import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/appRouter";
import {connect} from "react-redux";
import {authorizeAction} from "./actions/adminActions";
import {bindActionCreators} from "redux";

const App = ({ isAuth, authorizeAction }) => {
    useEffect(() => {
        authorizeAction();
    });

    return (
        <div id="App">
          <BrowserRouter>
              <AppRouter isAuth={isAuth}/>
          </BrowserRouter>
        </div>
    );
};

const actions = {authorizeAction};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ admin }) =>({
    isAuth: admin.isAuth,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);