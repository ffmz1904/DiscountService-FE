import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/appRouter";
import {connect} from "react-redux";
import {authorizeAction} from "./actions/adminActions";
import {bindActionCreators} from "redux";
import LoaderWidget from "./components/LoaderWidget";

const App = ({ isAuth, authorizeAction }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        authorizeAction().then(() => setTimeout(() => setIsLoading(false), 1000));
    });

    if (isLoading) {
        return <LoaderWidget/>;
    }

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