import {
    ADD_APPOINTMENT,
    DELETE_APPOINTMENT,
    EDIT_APPOINTMENT,
    SET_APPOINTMENTS,
    SetAppointmentAction
  } from './types';
  
  import { IAppointment } from '../../interfaces/patient';
  import * as api from '../../api/index';
  import {toast} from 'react-toastify';

  export const setAppointments = (appointments: IAppointment[]): SetAppointmentAction => ({
    type: SET_APPOINTMENTS,
    payload: appointments
  });
  
  export const addAppointment = (appointment: IAppointment) => async (dispatch) => {
    try {
      const { data } = await api.createAppointment(appointment);
      toast.success("Appointment added!!");
      dispatch({ type: ADD_APPOINTMENT, payload: data });
    } catch (error) {
      console.log("Error on add appointment");
    }
  };
  
  export const deleteAppointment = (id: string) => async (dispatch) => {
    try {
      await api.deleteAppointment(id);
      toast.success("Appointment deleted");
      dispatch({ type: DELETE_APPOINTMENT, id });
      console.log(id);
    } catch (error) {
      console.log("Error while deleting appointment");
    }
  };  
    
  export const editAppointment = (appointment: IAppointment) => async (dispatch) => {
    try {
      const { data } = await api.editAppointment(appointment._id,appointment);
      toast.success("Appointment edited!!");
  
      dispatch({ type: EDIT_APPOINTMENT, payload: data });
    } catch (error) {
      console.log("Error on editing appointment");
    }
  };
  
  
  export const fetchAppointments  = () => async (dispatch) => {
    try {
      
      const { data }= await api.fetchAppointment();
      dispatch({ type: SET_APPOINTMENTS, payload: data });
    } catch (error) {
      console.log("Error");
    }
  };
  