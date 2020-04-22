package com.itechartgroup.telemed.appointment.web;

import com.itechartgroup.telemed.appointment.dto.AppointmentDTO;
import com.itechartgroup.telemed.appointment.dto.AppointmentEditParamsDTO;
import com.itechartgroup.telemed.appointment.dto.AppointmentReadParamsDTO;
import com.itechartgroup.telemed.appointment.entity.Appointment;
import com.itechartgroup.telemed.appointment.exception.AppointmentEditException;
import com.itechartgroup.telemed.appointment.factory.AppointmentEditFactory;
import com.itechartgroup.telemed.appointment.factory.AppointmentEditType;
import com.itechartgroup.telemed.appointment.service.impl.AppointmentServiceImpl;
import com.itechartgroup.telemed.security.CurrentUser;
import com.itechartgroup.telemed.security.UserPrincipal;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/appointment")
public class AppointmentController {

    private AppointmentServiceImpl appointmentService;

    @PostMapping("/all")
    public ResponseEntity<Collection<AppointmentDTO>> getAllAppointments(
            @CurrentUser final UserPrincipal userPrincipal) {

        Collection<AppointmentDTO> appointments = appointmentService.getAll(userPrincipal.getId());
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @PostMapping("/date_range")
    public ResponseEntity<Collection<AppointmentDTO>> getAppointmentsByDateRange(
            @CurrentUser UserPrincipal userPrincipal,
            @RequestBody AppointmentReadParamsDTO readParams) {

        Collection<AppointmentDTO> appointments = appointmentService
                .getByDateRange(userPrincipal.getId(), readParams);

        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AppointmentDTO> editAppointment(
            @CurrentUser final UserPrincipal currentUser,
            @RequestBody AppointmentEditParamsDTO editParams){

        AppointmentEditType editType = AppointmentEditFactory.defineAppointmentEditType(editParams);

        if (editType.equals(AppointmentEditType.CREATE)) {
            return processCreateAppointments(currentUser, editParams.getAdded());
        } else if (editType.equals(AppointmentEditType.UPDATE)) {
            return processUpdateAppointment(currentUser, editParams.getChanged());
        } else if (editType.equals(AppointmentEditType.DELETE)) {
            return processDeleteAppointment(editParams.getDeleted());
        } else {
            throw new AppointmentEditException("Requested appointment edit type is not supported");
        }
    }

    private ResponseEntity<AppointmentDTO> processCreateAppointments(final UserPrincipal currentUser, List<AppointmentDTO> lst) {
        AppointmentDTO dto = lst.get(0);
        return new ResponseEntity<>(appointmentService.saveAppointment(currentUser.getId(), dto), HttpStatus.OK);
    }

    private ResponseEntity<AppointmentDTO> processUpdateAppointment(final UserPrincipal currentUser, List<AppointmentDTO> lst) {
        AppointmentDTO dto = lst.get(0);
        return new ResponseEntity<>(appointmentService.saveAppointment(currentUser.getId(), dto), HttpStatus.OK);
    }

    private ResponseEntity<AppointmentDTO> processDeleteAppointment(List<AppointmentDTO> lst) {
        AppointmentDTO dto = lst.get(0);
        return new ResponseEntity<>(appointmentService.deleteAppointment(dto), HttpStatus.OK);
    }
}
