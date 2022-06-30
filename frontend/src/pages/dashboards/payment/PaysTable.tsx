import React, { useState } from 'react';

import { ColumnProps } from 'antd/es/table';
import { Avatar, Table, Button, Modal, Tag } from 'antd';

import { IBilling } from '../../../interfaces/patient';
import PayForm from '../../../layout/components/payment/PayForm';

type Props = {
  payments: IBilling[];
  onEditPayment: (payment: IBilling) => void;
  onDeletePayment?: (id: string) => void;
};

const PaysTable = ({
  payments,
  onEditPayment = () => null,
  onDeletePayment = () => null
}: Props) => {

  const [payment, setPayment] = useState(null);
  const [visibility, setVisibility] = useState(false);

  const closeModal = () => setVisibility(false);
  const handleDeletePayment = (id) => onDeletePayment(id);
  const handleEditPayment = (payment: IBilling) => {
    setPayment(payment);
    setVisibility(true);
  };

  const actions = (payment: IBilling) => (
    <div className='buttons-list nowrap'>
      <Button onClick={handleEditPayment.bind({}, payment)} shape='circle' type='primary'>
        <span className='icofont icofont-edit-alt' />
      </Button>
      <Button onClick={handleDeletePayment.bind({}, payment._id)} shape='circle' danger>
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  );

  const columns: ColumnProps<IBilling>[] = [
    
    {
        key: 'billNo',
        dataIndex: 'billNo',
        title: 'BillNo',
        sorter: (a, b) => (a.billNo > b.billNo ? 1 : -1),
        render: (billNo) => (
          <span className='nowrap' style={{ color: '#a5a5a5' }}>
            {billNo}
          </span>
        )
      },
      {
        key: 'patient',
        dataIndex: 'patient',
        title: 'Patient',
        sorter: (a, b) => (a.patient > b.patient ? 1 : -1),
        render: (patient) => <strong>{patient}</strong>
      },
      { key: 'doctor', title: 'Doctor', dataIndex: 'doctor' },
    {
      key: 'billData',
      dataIndex: 'billDate',
      title: 'BillDate',
      render: (billDate) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {billDate}
        </span>
      )
    },
    {
      key: 'charges',
      dataIndex: 'charges',
      title: 'Charges',
      render: (charges) => (
        <span className='d-flex align-baseline nowrap' style={{ color: '#336cfb' }}>
          <span className='icofont icofont-rupee mr-1' style={{ fontSize: 16 }} />
          {charges}
        </span>
      )
    },
    {
        key: 'discount',
        dataIndex: 'discount',
        title: 'Discount',
        render: (discount) => (
          <span className='d-flex align-baseline nowrap' style={{ color: '#336cfb' }}>
            <span className='icofont icofont-sale-discount mr-1' style={{ fontSize: 16 }} />
            {discount}
          </span>
        )
      },
      {
        key: 'tax',
        dataIndex: 'tax',
        title: 'Tax',
        render: (tax) => (
          <span className='d-flex align-baseline nowrap' style={{ color: '#336cfb' }}>
            <span className='icofont icofont-rupee mr-1' style={{ fontSize: 16 }} />
            {tax}
          </span>
        )
      },
      {
        key: 'total',
        dataIndex: 'total',
        title: 'Total',
        render: (total) => (
          <span className='d-flex align-baseline nowrap' style={{ color: '#336cfb' }}>
            <span className='icofont icofont-ui-note mr-1' style={{ fontSize: 16 }} />
            {total}
          </span>
        )
      },
    {
      key: 'actions',
      title: 'Actions',
      render: actions
    }
  ];

  const pagination = payments.length <= 10 ? false : {};

  return (
    <>
      <Table
        pagination={pagination}
        className='accent-header'
        rowKey='_id'
        dataSource={payments}
        columns={columns}
      />

      <Modal
        visible={visibility}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        title={<h3 className='title'>Add patient</h3>}
      >
        <PayForm
          submitText='Update patient'
          onCancel={closeModal}
          onSubmit={onEditPayment}
          payment={payment}
        />
      </Modal>
    </>
  );
};

export default PaysTable;