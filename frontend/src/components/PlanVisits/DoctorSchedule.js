import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  ListItem,
} from '@material-ui/core';
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
import { getDrAppointments } from '../../services/VisitsRequest';

const useStyles = makeStyles({
  timesContainer: {
    paddingTop: '1rem',
    height: '90%',
    overflowY: 'auto',
  },

  timeCard: {
    width: '80%',
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid gray',
    borderRadius: '8px',
  },
});

const mockTimes = ['09:00', '10:00', '11:30', '12:00', '14:00', '16:00'];

function DoctorSchedule({ doctorId, returnBack }) {
  const classes = useStyles();

  const [doctorSchedule, setSchedule] = useState();
  useEffect(() => {
    doctorId = "b1d4ca09-1cdf-2481-ba41-f4daa7dc156f";
    getDrAppointments(doctorId).then((result) => setSchedule(result));
  }, []);
  
  return (
    <>
      <Button
        variant="text"
        startIcon={<ArrowBack />}
        size="large"
        onClick={returnBack}
        style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}
      >
        Go back
      </Button>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={9}>
          <Typography variant="h5">Pick a date</Typography>
          <ScheduleComponent currentView="Month">
            <Inject services={[WorkWeek, Week, Month, Agenda, MonthAgenda]} />
          </ScheduleComponent>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5">Pick a time</Typography>
          <Grid
            container
            direction="column"
            wrap="nowrap"
            className={classes.timesContainer}
          >
            {mockTimes.length &&
              mockTimes.map((time) => (
                <ListItem button className={classes.timeCard}>
                  {time}
                </ListItem>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default DoctorSchedule;
