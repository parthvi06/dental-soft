import React from 'react';

import { Modal } from 'antd';

import PaymentForm from './PaymentForm';
import { IBilling } from '../../../interfaces/patient';

type Props = {
  onSubmit: (payment: IBilling) => void;
  visible: boolean;
  onClose: () => void;
};

const AddPayment = ({ visible, onClose, onSubmit }: Props) => {
  return (
   <div>
       <Modal
       visible={visible}
       onCancel={onClose}
       destroyOnClose
       footer={null}
       title={<h3 className='title'>Add Payment</h3>}
       >
       <PaymentForm onCancel={onClose} onSubmit={onSubmit} submitText='Add payment' />
       
       </Modal>
   </div>
  );
};

export default AddPayment;
