import React, { useState, useEffect } from 'react';
import FilterDoctors from './FilterDoctors';
import { createRoom } from '../../services/ChatRequests';

import { Grid, Typography, Paper, Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoctorSchedule from './DoctorSchedule';
import { getDoctorsList } from '../../services/VisitsRequest';

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid lightgray !important',
    wrap: 'nowrap',
    width: '80%',
    padding: '1rem',
    marginTop: '1.5rem',
  },
  location: {
    fontWeight: 'normal',
  },
  doctorInfo: {
    padding: '1rem 0',
    fontSize: '1rem',
  },

  button: {
    width: '12rem',
    marginLeft: '1rem',
    height: '3rem',
    color: '#00B5AD',
    border: '1px solid #00B5AD !important',
    '&:hover': {
      background: '#00B5AD',
      color: 'white',
    },
  },
});

// const sendMessageToDoctor = (doctorId) => {
//   const requestData = [doctorId];

//   createRoom(requestData);
// };

const DoctorCard = (props) => {
  const { id, name } = props.props;
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">{name}</Typography>
      {/* <Link variant="button" className={classes.doctorInfo}>
        View profile
      </Link> */}

      <Typography>
        Doctors, also known as Physicians, are licensed health professionals who
        maintain and restore human health through the practice of medicine.
      </Typography>

      <Grid container justify="flex-end">
        {/* <Button className={classes.button} onClick={() => props.openDialogs()}>
          Send message
        </Button> */}
        <Button className={classes.button} onClick={() => props.onClick(id)}>
          Schedule visit
        </Button>
      </Grid>
    </Paper>
  );
};

const DoctorsList = (props) => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [isScheduleShow, setIsShown] = useState({
    isShow: false,
    doctorId: null,
  });

  useEffect(() => {
    getDoctorsList().then((response) => setDoctorsList(response));
  }, []);

  const showCalendar = (id) => {
    setIsShown({ isShow: true, doctorId: id });
  };
  const hideCalendar = () => {
    setIsShown({ isShow: false, doctorId: null });
  };
  const openDialogs = () => null;
  
  const userId = props.props.location.state.currentUser.id
  return (
    <div>
      {isScheduleShow.isShow ? (
        <DoctorSchedule
          doctorId={isScheduleShow.doctorId}
          returnBack={hideCalendar}
          userId={userId}
        />
      ) : (
        <>
          <FilterDoctors />
          <Grid>
            <Typography variant="h6">Recommended doctors</Typography>
            <Grid container direction="column" wrap="nowrap">
              {!doctorsList.length ? (
                <p>No doctors found</p>
              ) : (
                doctorsList.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    props={doctor}
                    onClick={showCalendar}
                    openDialogs={openDialogs}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default DoctorsList;
