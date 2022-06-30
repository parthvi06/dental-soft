 import {
     ADD_PAYMENT,
     DELETE_PAYMENT,
     EDIT_PAYMENT,
     SET_PAYMENTS,
     SetPaymentAction
   } from './types';
 
   import { IBilling } from '../../interfaces/patient';
   import * as api from '../../api/index';
   import {toast} from 'react-toastify';
 
   export const setPayments = (payments: IBilling[]): SetPaymentAction => ({
     type: SET_PAYMENTS,
     payload: payments
   });
 
   export const addPayment = (payment: IBilling) => async (dispatch) => {
     try {
       const { data } = await api.createPayment(payment);
       toast.success("Payment Data added!!");
       dispatch({ type: ADD_PAYMENT, payload: data });
     } catch (error) {
       console.log("Error on add payment data");
     }
   };
 
   export const deletePayment = (id: string) => async (dispatch) => {
     try {
       await api.deletePayment(id);
       toast.success("Payment data deleted");
       dispatch({ type: DELETE_PAYMENT, id });
       console.log(id);
     } catch (error) {
       console.log("Error while deleting Payment data");
     }
   };  
 
   export const editPayment = (payment: IBilling) => async (dispatch) => {
     try {
       const { data } = await api.editPayment(payment._id,payment);
       toast.success("Payment data edited!!");
 
       dispatch({ type: EDIT_PAYMENT, payload: data });
     } catch (error) {
       console.log("Error on editing payment data");
     }
   };
 
 
   export const fetchPayments  = () => async (dispatch) => {
     try {
 
       const { data }= await api.fetchPayment();
       dispatch({ type: SET_PAYMENTS, payload: data });
     } catch (error) {
       console.log("Error");
     }
   };
 
 