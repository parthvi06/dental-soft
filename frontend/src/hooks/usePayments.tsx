import { IBilling } from '../interfaces/patient';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../redux/payments/actions';

import { IAppState } from '../interfaces/app-state';

export function usePayments() {
  const dispatch = useDispatch();
  const payments = useSelector<IAppState, IBilling[]>((state) => state.payments);
  const editPayment = (payment: IBilling) => {
    return dispatch(actions.editPayment(payment));
  };

  const addPayment = (payment: IBilling) => {
    return dispatch(actions.addPayment(payment));
  };

  const deletePayment = (id: string) => {
    return dispatch(actions.deletePayment(id));
  };

  return { payments, addPayment, editPayment, deletePayment };
}