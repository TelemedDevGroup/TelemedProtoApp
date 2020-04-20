import React from "react";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Calendar from "./Calendar";
import DoctorAvailabilityCalendar from "./DoctorAvailabilityCalendar";

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div>{children}</div>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DoctorCalendars = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Visits" {...a11yProps(0)} />
                <Tab label="Availability editor" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Calendar/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DoctorAvailabilityCalendar currentUserId={props.userData.id}/>
            </TabPanel>
        </div>
    );
}

export default DoctorCalendars;
