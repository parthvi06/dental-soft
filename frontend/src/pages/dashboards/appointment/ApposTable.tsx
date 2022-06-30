import React, { useState } from 'react';

import { ColumnProps } from 'antd/es/table';
import { Avatar, Table, Button, Modal, Tag } from 'antd';

import { IAppointment } from '../../../interfaces/patient';
import AppoForm from '../../../layout/components/appointment/AppoForm';

type Props = {
  appointments: IAppointment[];
  onEditAppointment: (appointment: IAppointment) => void;
  onDeleteAppointment?: (id: string) => void;
};

const ApposTable = ({
  appointments,
  onEditAppointment = () => null,
  onDeleteAppointment = () => null
}: Props) => {

  const [appointment, setAppointment] = useState(null);
  const [visibility, setVisibility] = useState(false);

  const closeModal = () => setVisibility(false);
  const handleDeleteAppointment = (id) => onDeleteAppointment(id);
  const handleEditAppointment = (appointment: IAppointment) => {
    setAppointment(appointment);
    setVisibility(true);
  };

  const actions = (appointment: IAppointment) => (
    <div className='buttons-list nowrap'>
      {/* <Button shape='circle' onClick={handleShowInfo}>
        <span className='icofont icofont-external-link' />
      </Button> */}
      <Button onClick={handleEditAppointment.bind({}, appointment)} shape='circle' type='primary'>
        <span className='icofont icofont-edit-alt' />
      </Button>
      <Button onClick={handleDeleteAppointment.bind({}, appointment._id)} shape='circle' danger>
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  );

  const columns: ColumnProps<IAppointment>[] = [
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Name',
      sorter: (a, b) => (a.title > b.title ? 1 : -1),
      render: (title) => <strong>{title}</strong>
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
      sorter: (a, b) => (a.email > b.email ? 1 : -1),
      render: (email) => (
        <span className='nowrap' style={{ color: '#336cfb' }}>
          <span className='icofont icofont-ui-email mr-1' style={{ fontSize: 16 }} />
          {email}
        </span>
      )
    },
    {
      key: 'start',
      dataIndex: 'start',
      title: 'Date',
      render: (start) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {start}
        </span>
      )
    },
    {
      key: 'visit',
      title: 'Visit time',
      render: (appointment) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {appointment.fromTo}
        </span>
      )
    },
    {
      key: 'number',
      dataIndex: 'number',
      title: 'Number',
      render: (phone) => (
        <span className='d-flex align-baseline nowrap' style={{ color: '#336cfb' }}>
          <span className='icofont icofont-ui-cell-phone mr-1' style={{ fontSize: 16 }} />
          {phone}
        </span>
      )
    },
    { key: 'doctor', title: 'Doctor', dataIndex: 'doctor' },
    { key: 'condition', title: 'Injury/Condition', dataIndex: 'injury' },
    {
      key: 'actions',
      title: 'Actions',
      render: actions
    }
  ];

  const pagination = appointments.length <= 10 ? false : {};

  return (
    <>
      <Table
        pagination={pagination}
        className='accent-header'
        rowKey='_id'
        dataSource={appointments}
        columns={columns}
      />

      <Modal
        visible={visibility}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        title={<h3 className='title'>Add Appointment</h3>}
      >
        <AppoForm
          submitText='Update Appointment'
          onCancel={closeModal}
          onSubmit={onEditAppointment}
          appointment={appointment}
        />
      </Modal>
    </>
  );
};

export default ApposTable;
