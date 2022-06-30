import { IBilling } from '../../interfaces/patient';

export const SET_PAYMENTS = '[payments] Set';
export const ADD_PAYMENT = '[payments] Add';
export const EDIT_PAYMENT = '[payments] Edit';
export const DELETE_PAYMENT = '[payments] Delete';

export interface SetPaymentAction {
  type: typeof SET_PAYMENTS;
  payload: IBilling[];
}

export interface AddPaymentAction {
  type: typeof ADD_PAYMENT;
  payload: IBilling;
}

export interface EditPaymentAction {
  type: typeof EDIT_PAYMENT;
  payload: IBilling;
}

export interface DeletePaymentAction {
  type: typeof DELETE_PAYMENT;
  id: string;
}


export type PaymentsActions =
  | SetPaymentAction
  | AddPaymentAction
  | DeletePaymentAction
  | EditPaymentAction;