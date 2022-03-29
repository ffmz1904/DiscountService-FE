import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/appRouter";

const App = () => {
    return (
        <div id="App">
          <BrowserRouter>
              <AppRouter isAuth={true}/>
          </BrowserRouter>
        </div>
    );
};

export default App;