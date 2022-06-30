import { IAppointment } from '../interfaces/patient';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../redux/appointments/actions';

import { IAppState } from '../interfaces/app-state';

export function useAppointments() {
  const dispatch = useDispatch();
  const appointments = useSelector<IAppState, IAppointment[]>((state) => state.appointments);
  const editAppointment = (appointment: IAppointment) => {
    return dispatch(actions.editAppointment(appointment));
  };
  
  const addAppointment = (appointment: IAppointment) => {
    return dispatch(actions.addAppointment(appointment));
  };

  const deleteAppointment = (id: string) => {
    return dispatch(actions.deleteAppointment(id));
  };

  return { appointments, addAppointment, editAppointment, deleteAppointment };
}
