import React, {useEffect, useState} from 'react';
import {Agenda, Day, Inject, Month, ScheduleComponent, Week, WorkWeek} from '@syncfusion/ej2-react-schedule'
import {getAvailabilitySlots} from "../../services/ChatRequests";

const DoctorAvailabilityCalendar = ({currentUserId}) => {
    let [data, setData] = useState([]);

    useEffect(() => {
        getAvailabilitySlots(currentUserId).then(response => setData(response));
    }, []);

    return (
        <ScheduleComponent eventSettings={{dataSource: data}}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>
    );
}


export default DoctorAvailabilityCalendar;
