import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";
import DoctorBoard from '../../screens/doctor/DoctorBoard.js';
import PatientBoard from '../../screens/patient/PatientBoard.js';
import PageNotFound from './PageNotFound.js';
import AccountAPI from '../../mocks/test_users.js';
import Header from './Header.js';
import OAuth2RedirectHandler from '../OAuth2/OAuth2RedirectHandler';


class BasicNav extends Component {
  render() {
    const user = this.props.location.state.currentUser;
    if (!user) {
      return <PageNotFound/>
    }
    return (
      <React.Fragment>
        <Header authorisedUser={user} />
        <br/>
        <Switch>
          <Route path="/user/board" component={PatientBoard} />
          <Route path="/doctor/board" component={DoctorBoard} />
          <Route path="/" component={PageNotFound} />
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default BasicNav;
