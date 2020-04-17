import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import {
  ScheduleComponent,
  WorkWeek,
  Week,
  Month,
  Inject,
  Agenda,
  MonthAgenda,
} from '@syncfusion/ej2-react-schedule';
import ArrowBack from '@material-ui/icons/ArrowBack';

function DoctorSchedule({doctorId, returnBack}) {    
  return (
    <Grid container direction="column">
      <Button variant='text' startIcon={<ArrowBack/>} size="large" onClick={returnBack} style={{alignSelf: "flex-start", marginBottom: "1rem"}}>Go back</Button>
      <Typography variant="h6">Pick a date</Typography>
      <ScheduleComponent currentView="Month">
        <Inject services={[WorkWeek, Week, Month, Agenda, MonthAgenda]} />
      </ScheduleComponent>
    </Grid>
  );
}

export default DoctorSchedule;
