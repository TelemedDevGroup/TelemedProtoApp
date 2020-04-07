import React, {Component} from 'react';
import { Divider, Header, Checkbox, Icon, List } from 'semantic-ui-react'
import {
  ScheduleComponent,
  Agenda,
  Inject,
  Day,
  ViewDirective,
  ViewsDirective
} from '@syncfusion/ej2-react-schedule'

class ToDoSection extends Component {
  render() {
    return (
      <React.Fragment>
        <Divider horizontal>
          <Header as='h3'>
            <Icon name='tasks' />
            Outstanding Actions
          </Header>
        </Divider>

        <List selection verticalAlign='middle'>
            <List.Item>
              <Checkbox label='review exams' />
            </List.Item>
            <List.Item>
                <Checkbox label='make prescription' />
            </List.Item>
          </List>


        <Divider horizontal>
          <Header as='h3'>
            <Icon name='calendar alternate' />
            Upcoming Events
          </Header>
        </Divider>

        <ScheduleComponent currentView='Agenda' height="400px">
          <ViewsDirective>
            <ViewDirective option='Agenda' />
          </ViewsDirective>
          <Inject services={[Day, Agenda]} />
        </ScheduleComponent>
      </React.Fragment>
    );
  };
}


export default ToDoSection
