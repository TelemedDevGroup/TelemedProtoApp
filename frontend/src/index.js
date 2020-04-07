import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";


import HomePage from './home_page.js';
import DemoMainLayout from './components/DemoMainLayout.js'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(  (
  <BrowserRouter>
    <Route exact path="/" component={HomePage}/>
    <Route exact path="/test" component={DemoMainLayout}/>
    <Route path="/home" component={HomePage}/>
    <Route path="/user/:userID" component={DemoMainLayout}/>
    <Route path="/doctor/:userID" component={DemoMainLayout}/>

  </BrowserRouter>

  ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
