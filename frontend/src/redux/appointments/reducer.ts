import { ADD_APPOINTMENT, DELETE_APPOINTMENT, EDIT_APPOINTMENT, AppointmentsActions, SET_APPOINTMENTS } from './types';
import { IAppointment } from '../../interfaces/patient';

const initialState: IAppointment[] = [];

export function appointmentsReducer(
  state: IAppointment[] = initialState,
  action: AppointmentsActions
): IAppointment[] {
  switch (action.type) {
    case SET_APPOINTMENTS: {
      return [...action.payload];
    }

    case EDIT_APPOINTMENT: {
      const editedappointments = state.map((el) => (el._id !== action.payload._id ? el : action.payload));

      return [...editedappointments];
    }

    case ADD_APPOINTMENT: {
      return [{ ...action.payload }, ...state];
    }

    case DELETE_APPOINTMENT: {
      const appointments = state.filter((el) => el._id !== action.id);
      return [...appointments];
    }

    default: {
      return state;
    }
  }
}