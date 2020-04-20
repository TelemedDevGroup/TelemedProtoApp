import React from "react";
import {Tab} from "semantic-ui-react";
import Calendar from "./Calendar";
import DoctorAvailabilityCalendar from "./DoctorAvailabilityCalendar";

const DoctorCalendar = ({userData}) => {
    const panes = [
        {menuItem: 'Visits', render: () => <Calendar/>},
        {
            menuItem: 'Availability editor',
            render: (props) => <DoctorAvailabilityCalendar currentUserId={props.currentUserId}/>}
    ]

    return (
        <Tab panes={panes} currentUserId={userData.id}/>
    )
}

export default DoctorCalendar
