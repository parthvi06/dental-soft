import axios from 'axios';

const url = 'http://localhost:7000/patients';
export const fetchPatient = () => axios.get(url);
export const createPatient = (newPatient) => axios.post(url, newPatient);
export const deletePatient = (id) => axios.delete(`${url}/${id}`);
export const editPatient = (id, editPatient) => axios.patch(`${url}/${id}`, editPatient);

const a_url = 'http://localhost:7000/appointments';
export const fetchAppointment = () => axios.get(a_url);
export const deleteAppointment = (id) => axios.delete(`${a_url}/${id}`);
export const createAppointment = (newAppointment) => axios.post(a_url, newAppointment);
export const editAppointment = (id, editAppointment) => axios.patch(`${a_url}/${id}`, editAppointment);


const pay_url = 'http://localhost:7000/payments';
export const fetchPayment = () => axios.get(pay_url);
export const deletePayment = (id) => axios.delete(`${pay_url}/${id}`);
export const createPayment = (newPayment) => axios.post(pay_url, newPayment);
export const editPayment = (id, editPayment) => axios.patch(`${pay_url}/${id}`, editPayment);