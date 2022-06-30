import { ADD_PAYMENT, DELETE_PAYMENT, EDIT_PAYMENT, PaymentsActions, SET_PAYMENTS } from './types';
import { IBilling } from '../../interfaces/patient';

const initialState: IBilling[] = [];

export function paymentsReducer(
  state: IBilling[] = initialState,
  action: PaymentsActions
): IBilling[] {
  switch (action.type) {
    case SET_PAYMENTS: {
      return [...action.payload];
    }

    case EDIT_PAYMENT: {
      const editedpayments = state.map((el) => (el._id !== action.payload._id ? el : action.payload));

      return [...editedpayments];
    }

    case ADD_PAYMENT: {
      return [{ ...action.payload }, ...state];
    }

    case DELETE_PAYMENT: {
      const payments = state.filter((el) => el._id !== action.id);
      return [...payments];
    }

    default: {
      return state;
    }
  }
}
