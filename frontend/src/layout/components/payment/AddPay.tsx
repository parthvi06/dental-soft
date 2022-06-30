import React, { useState } from 'react';

import { Button, Modal } from 'antd';

import PayForm from './PayForm';
import { usePayments } from '../../../hooks/usePayments';

import { IBilling } from '../../../interfaces/patient';

const AddPay = () => {
  const { addPayment } = usePayments();
  const [visible, setVisible] = useState(false);

  const handleClick = () => setVisible(!visible);

  const closeModal = () => setVisible(false);

  const handleAddPayments = (payment: IBilling) => {
    addPayment(payment);
    closeModal();
  };

  return (
    <div className='add-patient'>
      <Button type='primary' onClick={handleClick}>
        <span className='icofont icofont-plus mr-2' style={{ fontSize: '1.3em' }} />
        Add Payment
      </Button>
      <Modal
        visible={visible}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        title={<h3 className='title'>Add Payment Details</h3>}
      >
        <PayForm onCancel={closeModal} onSubmit={handleAddPayments} />
      </Modal>
    </div>
  );
};

export default AddPay;