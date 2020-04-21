import React, {useEffect, useState} from 'react';
import {Agenda, Day, Inject, Month, ScheduleComponent, Week, WorkWeek} from '@syncfusion/ej2-react-schedule'
import {request} from "../../services/Request";
import {API_BASE_URL} from "../../constants";

const DoctorAvailabilityCalendar = ({currentUserId}) => {
    let [data, setData] = useState([]);

    const eventTypes = {
        eventCreate: {
            action: 'POST',
            extractRequest: function (requestArgs) {
                return requestArgs.addedRecords;
            },
            handleResponse: function (response, requestArgs) {
                let createdRecordsIds = requestArgs.addedRecords.map(requestArgs => requestArgs.id);

                let newData = data.filter(function (event) {
                    return !createdRecordsIds.includes(event.id);
                });
                setData(newData.concat(response));
            }
        },
        eventChange: {
            action: 'PUT',
            extractRequest: function (requestArgs) {
                return requestArgs.changedRecords;
            },
            handleResponse: function (response, requestArgs) {
                let updatedRecordsIds = response.map(response => response.id);

                let newData = data.filter(function (event) {
                    return !updatedRecordsIds.includes(event.id);
                });
                setData(newData.concat(response));
            }
        },
        eventRemove: {
            action: 'DELETE',
            extractRequest: function (requestArgs) {
                return  requestArgs.deletedRecords;
            },
            handleResponse: function (response, requestArgs) {
                let deletedRecordsIds = response.map(response => response.id);

                let newData = data.filter(function (event) {
                    return !deletedRecordsIds.includes(event.id);
                });
                setData(newData);
            }
        }
    };

    const requestEventUpdate = (eventType, requestArgs) => {
        if (eventTypes[eventType] === undefined) {
            return;
        }

        request({
            url: API_BASE_URL + "/api/availability",
            method: eventTypes[eventType].action,
            body: JSON.stringify(eventTypes[eventType].extractRequest(requestArgs))
        }).then(response => eventTypes[eventType].handleResponse(response, requestArgs))
            .catch(error => {
                console.log('Error during availability event update: ' + error);
            });
    }

    const actionBegin = (args) => {
        requestEventUpdate(args.requestType, args);
    }

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
        <ScheduleComponent eventSettings={{dataSource: data}} actionBegin={actionBegin}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>
    );
}


export default DoctorAvailabilityCalendar;
