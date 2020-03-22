import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import MainPage from "./components/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={props => <MainPage />} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
