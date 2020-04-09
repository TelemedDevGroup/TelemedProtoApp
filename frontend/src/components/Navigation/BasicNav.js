import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";
import DoctorBoard from '../../screens/doctor/DoctorBoard.js'
import PatientBoard from '../../screens/patient/PatientBoard.js'
import PageNotFound from './PageNotFound.js'
import AccountAPI from '../../mocks/test_users.js'
import Header from './Header.js';


class BasicNav extends Component {
  render() {
    const user = AccountAPI.get( this.props.match.params.userID );
    if (!user) {
      return <PageNotFound/>
    }
    return (
      <React.Fragment>
        <Header authorisedUser={user} />
        <br/>
        <Switch>
          <Route path="/user/:userID/board" component={PatientBoard} />
          <Route path="/doctor/:userID/board" component={DoctorBoard} />
          <Route path="/" component={PageNotFound} />
        </Switch>
      </React.Fragment>
    );
  }

}



export default BasicNav;
