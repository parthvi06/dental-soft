import {
    SET_APPOINTMENTS,
  } from './types';
  
  // import { IAppointment } from '../../interfaces/patient';
  import * as api from '../../api/index';
  import {toast} from 'react-toastify';
  interface ICreateEventCalendar {
    title: string;
    end: string;
    start: string;
    treatment: string
    backgroundColor: string;
    textColor: string;
  }
  
  export const addAppointment = async (ICreateEventCalendar) =>  {
    try {
      const response = await api.createAppointment(ICreateEventCalendar);
      console.log(ICreateEventCalendar)
      toast.success("Appointment added!!");
      return response.data;
      console.log(response.data);
    } catch (error) {
      console.log("Error on add appointment");
    }
  };
  // interface IDeleteEventCalendar {
  //   id: string;
  // }
  export const deleteAppointment =  async (id) =>  {
    try {
      await api.deleteAppointment(id);
      toast.success("Appointment deleted");
      console.log(id);
    } catch (error) {
      console.log("Error while deleting appointment");
    }
  };  
  interface IUpdateEventCalendar {
    _id: string;
    title: string;
    end: string;
    start: string;
    treatment: string;
    backgroundColor: string;
    textColor: string;
  }

  export const editAppointment = async (id,IUpdateEventCalendar) => {
    try {
      const response = await api.editAppointment(id,IUpdateEventCalendar);
      toast.success("Appointment edited!!");
      return response.data;
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
  export const getAllEventsCalendar = async () => {
    try {
      const response = await api.fetchAppointment();
      return response.data;
    } catch (err) {
      return err;
    }
  };