import React, {Component} from 'react';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject
} from '@syncfusion/ej2-react-schedule'
import {vh} from "react-native-expo-viewport-units";

class Calendar extends Component {
  render() {
    return (
      <ScheduleComponent height={vh(80)}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    );
  };
}


export default Calendar
