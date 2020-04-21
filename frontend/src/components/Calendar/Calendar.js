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
import { DataManager, UrlAdaptor  } from '@syncfusion/ej2-data';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';

class Calendar extends React.Component {

  constructor() {
    super(...arguments);
    this.dataManager = new DataManager({
      url: API_BASE_URL + '/api/appointment/date_range',
      // adaptor: new ODataV4Adaptor,
      crudUrl: API_BASE_URL + '/api/appointment',
      adaptor: new UrlAdaptor,
      headers: [
        {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
      ]
    });
  }

  render() {
    return (
      <ScheduleComponent
        eventSettings={{ dataSource: this.dataManager, query: this.dataQuery,
        fields: {
          id: 'appointment_id',
          subject: { name: 'subject' },
          isAllDay: { name: 'isAllDay' },
          location: { name: 'location' },
          description: { name: 'description' },
          startTime: { name: 'startTimestamp' },
          endTime: { name: 'endTimestamp' }
        }}}
        selectedDate={new Date(2020, 3, 16)}>

        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    );
  }
}


export default Calendar
