"use strict";
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var App_1 = require("./App");
var registerServiceWorker_1 = require("./registerServiceWorker");
require("./index.css");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var reducers_1 = require("./reducers");
var store = redux_1.createStore(reducers_1["default"]);
ReactDOM.render(<react_redux_1.Provider store={store}>
    <App_1["default"] />
  </react_redux_1.Provider>, document.getElementById('root'));
registerServiceWorker_1["default"]();
