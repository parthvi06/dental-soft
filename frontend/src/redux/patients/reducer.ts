import { ADD_PATIENT, DELETE_PATIENT, EDIT_PATIENT, PatientsActions, SET_PATIENTS } from './types';
import { IPatient } from '../../interfaces/patient';

const initialState: IPatient[] = [];

export function patientsReducer(
  state: IPatient[] = initialState,
  action: PatientsActions
): IPatient[] {
  switch (action.type) {
    case SET_PATIENTS: {
      return [...action.payload];
    }

    case EDIT_PATIENT: {
      const editedPatients = state.map((el) => (el._id !== action.payload._id ? el : action.payload));

      return [...editedPatients];
    }

    case ADD_PATIENT: {
      return [{ ...action.payload }, ...state];
    }

    case DELETE_PATIENT: {
      const patients = state.filter((el) => el._id !== action.id);
      return [...patients];
    }

    default: {
      return state;
    }
  }
}
