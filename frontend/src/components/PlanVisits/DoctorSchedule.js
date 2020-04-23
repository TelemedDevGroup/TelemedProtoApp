import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  ListItem,
  TextField,
} from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { createAppointment } from '../../services/VisitsRequest';

const useStyles = makeStyles({
  timesContainer: {
    width: '15rem',
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
    width: '100%',
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
  selectedTime: {
    background: '#00B5AD',
    color: 'white',
    border: '1px solid #00B5AD',
    '&:hover': {
      background: '#00B5AD',
      color: 'white',
    },
  },
  textField: {
    marginTop: '0.5rem',
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
  const [timeOnPickedDay, setPickedDay] = useState();
  const [selectedTime, setSelTime] = useState(null);
  const [subject, setSubject] = useState('');
  const [timeRange, setTimeRange] = useState([]);

  const handleDayClick = (value) => {
    setPickedDay(value);
    setShowTime(true);
  };

  const handleTimeClick = (time) => {
    setSelTime(time);
    const parseTime = time.split(':');
    const startTime = timeOnPickedDay;
    const endTime = timeOnPickedDay;
    startTime.setHours(parseTime[0]);
    startTime.setMinutes(parseTime[1]);
    endTime.setHours(+parseTime[0] + 1);
    endTime.setMinutes(parseTime[1]);
    setTimeRange([startTime.toISOString(), endTime.toISOString()]);
  };

  const handleCreateAppointment = () => {
    createAppointment({
      StartDate: timeRange[0],
      EndDate: timeRange[1],
      added: [
        {
          subject: subject,
          participantIds: [userId, doctorId],
          startTimestamp: timeRange[0],
          endTimestamp: timeRange[1],
        },
      ],
      changed: [],
      deleted: [],
    }).then((res) => {
      setSubject('');
      setSelTime(null);
      alert('Event created!');
    });
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
          <Typography variant="h5">1. Pick a day</Typography>
          <Calendar onClickDay={(value) => handleDayClick(value)} />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5">2. Pick a time</Typography>
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
                  className={`${selectedTime === time && classes.selectedTime} 
                    ${classes.timeCard}`}
                  key={time}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </ListItem>
              ))
            )}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5">3. Add a subject</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Subject"
            required
            color="secondary"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className={classes.textField}
          />
          <Button
            className={classes.button}
            disabled={!selectedTime || !subject}
            fullWidth
            onClick={() => handleCreateAppointment()}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default DoctorSchedule;
