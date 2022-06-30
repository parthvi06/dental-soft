import {
  ADD_PATIENT,
  DELETE_PATIENT,
  EDIT_PATIENT,
  SET_PATIENTS,
  SetPatientAction
} from './types';

import { IPatient } from '../../interfaces/patient';
import * as api from '../../api/index';
import {toast} from 'react-toastify';

export const setPatients = (patients: IPatient[]): SetPatientAction => ({
  type: SET_PATIENTS,
  payload: patients,
});

export const addPatient = (patient: IPatient) => async (dispatch) => {
  try {
    const { data } = await api.createPatient(patient);
    toast.success("Patient add!!");
    dispatch({ type: ADD_PATIENT, payload: data });
  } catch (error) {
    console.log("Error on add patient");
  }
};
export const deletePatient = (id: string) => async (dispatch) => {
  try {
    await api.deletePatient(id);
    toast.success("Pateint deleted");
    dispatch({ type: DELETE_PATIENT, id });
  } catch (error) {
    console.log("Error while deleting Pateint");
  }
};
export const editPatient = (patients:IPatient) => async (dispatch) => {
  try {
    const { data } = await api.editPatient(patients._id,patients);
    toast.success("Patient edited!!");

    dispatch({ type: EDIT_PATIENT, payload: data });
  } catch (error) {
    console.log("Error on editind patient");
  }
};

export const fetchPatients = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPatient();
    dispatch({ type: SET_PATIENTS, payload: data });
  } catch (error) {
    console.log("Error on fetch Patients");
  }
};