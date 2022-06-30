import { IAppointment } from '../../interfaces/patient';

export const SET_APPOINTMENTS = '[appointments] Set';
export const ADD_APPOINTMENT = '[appointments] Add';
export const EDIT_APPOINTMENT = '[appointments] Edit';
export const DELETE_APPOINTMENT = '[appointments] Delete';

export interface SetAppointmentAction {
  type: typeof SET_APPOINTMENTS;
  payload: IAppointment[];
}

export interface AddAppointmentAction {
  type: typeof ADD_APPOINTMENT;
  payload: IAppointment;
}

export interface EditAppointmentAction {
  type: typeof EDIT_APPOINTMENT;
  payload: IAppointment;
}

export interface DeleteAppointmentAction {
  type: typeof DELETE_APPOINTMENT;
  id: string;
}


export type AppointmentsActions =
  | SetAppointmentAction
  | AddAppointmentAction
  | DeleteAppointmentAction
  | EditAppointmentAction;
