import React, { useState, useEffect } from 'react';
import FilterDoctors from './FilterDoctors';
import { createRoom } from '../../services/ChatRequests';

import {
  Grid,
  Container,
  Typography,
  Paper,
  Link,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TEST_ACCOUNTS from '../../mocks/test_users';
import DoctorSchedule from './DoctorSchedule';
import ChatsGroup from '../Chat/ChatsGroup';

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid lightgray !important',
    wrap: 'nowrap',
    width: '100%',
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

const sendMessageToDoctor = (doctorId) => {
  //TODO replace hardcoded
  doctorId = "27e2aa19-76a1-248d-b42a-ed5f7da5a11b";
  const requestData = [doctorId.toString()];
  
  createRoom(requestData)
};

const DoctorCard = (props) => {
  const { id, name, location } = props.props;
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">
        {name}, <span className={classes.location}>{location}</span>
      </Typography>
      <Link variant="button" className={classes.doctorInfo}>
        View profile
      </Link>

      <Typography>
        Doctors, also known as Physicians, are licensed health professionals who
        maintain and restore human health through the practice of medicine.
      </Typography>

      <Grid container justify="flex-end">
        <Button
          className={classes.button}
          onClick={() => props.openDialogs()}
        >
          Send message
        </Button>
        <Button className={classes.button} onClick={() => props.onClick(id)}>
          Schedule visit
        </Button>
      </Grid>
    </Paper>
  );
};

const DoctorsList = ({props}) => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [isScheduleShow, setIsShown] = useState({
    isShow: false,
    doctorId: null,
  });
  
  useEffect(() => {
    const getUsers = TEST_ACCOUNTS.all();
    const getDoctors =
      getUsers && getUsers.filter((user) => user.user_type === 'Doctor');
    getDoctors && setDoctorsList(getDoctors);
  }, []);

  const showCalendar = (id) => {
    setIsShown({ isShow: true, doctorId: id });
  };
  const hideCalendar = () => {
    setIsShown({ isShow: false, doctorId: null });
  };
  const openDialogs = () => null

  return (
    <Container>
      {isScheduleShow.isShow ? (
        <DoctorSchedule
          doctorId={isScheduleShow.doctorId}
          returnBack={hideCalendar}
        />
      ) : (
        <>
          <FilterDoctors />
          <Grid>
            <Typography variant="h5">Recommended doctors</Typography>
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
    </Container>
  );
};

export default DoctorsList;
