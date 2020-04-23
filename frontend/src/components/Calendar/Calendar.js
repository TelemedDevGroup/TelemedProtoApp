import React from 'react';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject
} from '@syncfusion/ej2-react-schedule'
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { createElement } from '@syncfusion/ej2-base';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {vh} from "react-native-expo-viewport-units";

class Calendar extends React.Component {

  constructor() {
    super(...arguments);

    this.appointmentDataManager = new DataManager({
      url: API_BASE_URL + '/api/appointment/date_range',
      adaptor: new UrlAdaptor,
      crudUrl: API_BASE_URL + '/api/appointment',
      headers: [
        {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
      ]
    });

    this.userDataManager = new DataManager({
        adaptor: new UrlAdaptor,
        url: API_BASE_URL + '/api/user/available',
        headers: [
            {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        ]
    });
    this.userFields = { text: 'name', value: 'id' };
  }

  onPopupOpen(args) {
    if (args.type === 'QuickInfo') {
        args.cancel = true;
    }
    else if (args.type === 'Editor') {
      if (!args.element.querySelector('.custom-field-row')) {
        let row = createElement('div', { className: 'custom-field-row' });
        let formElement = args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
        let container = createElement('div', { className: 'custom-field-container' });
        let inputEle = createElement('input', {
          className: 'e-field', attrs: { name: 'participantIds' }
        });
        container.appendChild(inputEle);
        row.appendChild(container);

        console.log(args);

        // TODO: validation is required - tot null, no appointments of the user at specified time
        let multiSelect = new MultiSelect ({
          dataSource: this.userDataManager,
          fields: this.userFields,
          sortOrder: 'Ascending',
          value: args.data.participantIds,
          floatLabelType: 'Always',
          placeholder:'Select Participants',
          mode: 'Default'
        });

        multiSelect.appendTo(inputEle);
        inputEle.setAttribute('name', 'participantIds');
      }
    }
  }

  render() {
    return (
      <ScheduleComponent
        height={vh(70)}
        eventSettings={{ dataSource: this.appointmentDataManager,
        fields: {
          id: 'id',
          subject: { name: 'subject', validation: {required: true} },
          isAllDay: { name: 'isAllDay' },
          location: { name: 'location' },
          description: { name: 'description' },
          startTime: { name: 'startTimestamp', validation: {required: true} },
          endTime: { name: 'endTimestamp', validation: {required: true} },
          participants: {name: 'participants'},
          participantIds: {name: 'participantIds'}
        }}}
        selectedDate={new Date(2020, 3, 16)}
        popupOpen={this.onPopupOpen.bind(this)}>
          <ViewsDirective>
            <ViewDirective option='Day'/>
            <ViewDirective option='Week'/>
            <ViewDirective option='WorkWeek'/>
            <ViewDirective option='Month'/>
          </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    );
  }
}

export default Calendar
