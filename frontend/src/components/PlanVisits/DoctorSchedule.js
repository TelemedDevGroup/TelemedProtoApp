import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  ListItem,
} from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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

const mockTimes = ['10:00', '11:30', '12:00', '14:00', '15:00', '16:00', '17:00','18:00'];

function DoctorSchedule({ doctorId, returnBack }) {
  const classes = useStyles();

  const [doctorSchedule, setSchedule] = useState([]);
  const [timeOnPickedDay, setPickedDay] = useState();
  useEffect(() => {
    getDrAppointments(doctorId).then((result) =>
      setSchedule(
        result.map((time) => [new Date(time.StartTime), new Date(time.EndTime)])
      )
    );
  }, []);

  const handleDayClick = (value) => {    
    setPickedDay(value);
  };

  const handleTimeClick = (time) => {
    const parseTime = time.split(":")
    const pickedTime = timeOnPickedDay
    pickedTime.setHours(parseTime[0])
    pickedTime.setMinutes(parseTime[1])
    console.log(new Date(pickedTime));
  };

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
        <Grid item xs={5}>
          <Typography variant="h5">Pick a date</Typography>
          <Calendar
            onClickDay={(value) => handleDayClick(value)}
            // defaultValue={doctorSchedule.length && doctorSchedule}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5">Pick a time</Typography>
          <Grid
            container
            direction="column"
            wrap="nowrap"
            className={classes.timesContainer}
          >
            {!mockTimes.length ? (
              <p>No times found</p>
            ) : (
              mockTimes.map((time) => (
                <ListItem
                  button
                  className={classes.timeCard}
                  key={time}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </ListItem>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default DoctorSchedule;
