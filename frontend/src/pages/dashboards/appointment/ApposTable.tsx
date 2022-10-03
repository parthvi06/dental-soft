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
      key: 'start',
      dataIndex: 'start',
      title: 'Start',
      render: (start) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {start}
        </span>
      )
    },
    {
      key: 'end',
      dataIndex: 'end',
      title: 'End',
      render: (end) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {end}
        </span>
      )
    },
    
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
