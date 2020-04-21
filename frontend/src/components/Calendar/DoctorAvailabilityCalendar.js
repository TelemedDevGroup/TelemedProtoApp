import React, {useEffect, useState} from 'react';
import {Agenda, Day, Inject, Month, ScheduleComponent, Week, WorkWeek} from '@syncfusion/ej2-react-schedule'
import {request} from "../../services/Request";
import {API_BASE_URL} from "../../constants";

const DoctorAvailabilityCalendar = ({currentUserId}) => {
    let [data, setData] = useState([]);

    const getAvailabilitySlots = (doctorId) => {
        return request({
            url: API_BASE_URL + "/api/availability/" + doctorId,
            method: 'GET'
        });
    }

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
