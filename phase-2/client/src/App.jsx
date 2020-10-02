import React from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Upload from "./components/Upload/Upload";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home/:id" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/newPost" component={Upload} />
      </Switch>
    </div>
  );
}
