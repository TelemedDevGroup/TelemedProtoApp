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
import {
  getDrAppointments,
  createAppointment,
} from '../../services/VisitsRequest';

const useStyles = makeStyles({
  timesContainer: {
    width: '16rem',
    paddingTop: '1rem',
    minHeight: '20rem',
    maxHeight: '20rem',
    overflowY: 'auto',
  },

  timeCard: {
    width: '14rem',
    padding: '0.8rem',
    marginBottom: '0.8rem',
    border: '1px solid gray',
    borderRadius: '4px',
  },

  button: {
    width: '14rem',
    height: '3rem',
    marginTop: '1rem',
    background: '#00B5AD',
    color: 'white',
    '&:hover': {
      background: '#00B5AD',
      color: 'white',
    },
    '&:disabled': {
      background: 'lightgray',
      color: 'white',
    },
  },
});

const times = [
  '10:00',
  '11:30',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

function DoctorSchedule({ doctorId, returnBack, userId }) {
  const classes = useStyles();

  const [showTime, setShowTime] = useState(false);
  const [doctorSchedule, setSchedule] = useState([]);
  const [timeOnPickedDay, setPickedDay] = useState();
  const [appointment, setAppointment] = useState(null);
  useEffect(() => {
    getDrAppointments(doctorId).then((result) =>
      setSchedule(
        result.map((time) => [new Date(time.StartTime), new Date(time.EndTime)])
      )
    );
  }, []);

  const handleDayClick = (value) => {
    setPickedDay(value);
    setShowTime(true);
  };

  const handleTimeClick = (time) => {
    const parseTime = time.split(':');
    const startTime = timeOnPickedDay;
    const endTime = timeOnPickedDay;
    startTime.setHours(parseTime[0]);
    startTime.setMinutes(parseTime[1]);
    endTime.setHours(+parseTime[0] + 1);
    endTime.setMinutes(parseTime[1]);    

    setAppointment({
      subject: "test",
      participantIds: [userId, doctorId],
      startTimestamp: startTime.toISOString(),
      endTimestamp: endTime.toISOString()
    }
    );
  };

  const handleCreateAppointment = () => {
    appointment && createAppointment(appointment);
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
      <Grid container direction="row" spacing={2}>
        <Grid item xs={5}>
          <Typography variant="h5">Pick a date</Typography>
          <Calendar
            onClickDay={(value) => handleDayClick(value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h5">Pick a time</Typography>
          <Grid
            container
            direction="column"
            wrap="nowrap"
            className={classes.timesContainer}
          >
            {!showTime ? (
              <p>Select a day</p>
            ) : (
              times.map((time) => (
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
          {showTime && (
            <Button
              className={classes.button}
              disabled={!appointment}
              onClick={() => handleCreateAppointment()}
            >
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default DoctorSchedule;
