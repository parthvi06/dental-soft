import React, { useState } from 'react';

import { Button, Modal } from 'antd';

import AppoForm from './AppoForm';
import { useAppointments } from '../../../hooks/useAppointments';

import { IAppointment } from '../../../interfaces/patient';

const AddAppo = () => {
  const { addAppointment } = useAppointments();
  const [visible, setVisible] = useState(false);

  const handleClick = () => setVisible(!visible);

  const closeModal = () => setVisible(false);

  const handleAddAppointments = (appointment: IAppointment) => {
    addAppointment(appointment);
    closeModal();
  };

  return (
    <div className='add-patient'>
      <Button type='primary' onClick={handleClick}>
        <span className='icofont icofont-plus mr-2' style={{ fontSize: '1.3em' }} />
        Add appointment
      </Button>
      <Modal
        visible={visible}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        title={<h3 className='title'>Add appointment</h3>}
      >
        <AppoForm onCancel={closeModal} onSubmit={handleAddAppointments} />
      </Modal>
    </div>
  );
};

export default AddAppo;
