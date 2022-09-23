import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ColumnProps } from 'antd/es/table';
import { Avatar, Table, Button, Modal, Tag, Input } from 'antd';

import { IPatient } from '../../../interfaces/patient';
import PatientForm from '../../../layout/components/patients/PatientForm';
import { SearchOutlined } from "@ant-design/icons";
import { getPatient } from '../../../redux/patients/actions';
import { useDispatch } from 'react-redux';

type Props = {
  patients: IPatient[];
  onEditPatient: (patient: IPatient) => void;
  onDeletePatient?: (id: string) => void;
  onFetchPatient?: (patient: IPatient) => void;
};

type PatientsImgProps = {
  img: string;
};

const PatientImg = ({ img }: PatientsImgProps) => {
  const isData = img.startsWith('data:image');
  const isWithPath = img.startsWith('http');

  if (isData || isWithPath) {
    return <Avatar size={40} src={img} />;
  }

  return <Avatar size={40} src={`${window.location.origin}/${img}`} />;
};

const PatientsTable = ({
  patients,
  onEditPatient = () => null,
  onDeletePatient = () => null,
  onFetchPatient =() => null
}: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const id = useParams();
  const [patient, setPatient] = useState(null);
  const [visibility, setVisibility] = useState(false);

  const closeModal = () => setVisibility(false);

  const handleShowInfo = (id) =>{ history.push(`/vertical/patient/${id}`);  };
  const handleDeletePatient = (id) => onDeletePatient(id);
  const handleEditPatient = (patient: IPatient) => {
    setPatient(patient);
    setVisibility(true);
  };

  const actions = (patient: IPatient) => (
    <div className='buttons-list nowrap'>
      <Button shape='circle' onClick={handleShowInfo.bind({},patient._id)}>
        <span className='icofont icofont-external-link' />
      </Button>
      <Button onClick={handleEditPatient.bind({}, patient,patient._id)} shape='circle' type='primary'>
        <span className='icofont icofont-edit-alt' />
      </Button>
      <Button onClick={handleDeletePatient.bind({}, patient._id)} shape='circle' danger>
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  );

  
  const columns: ColumnProps<IPatient>[] = [
    // {
    //   key: 'img',
    //   title: 'Photo',
    //   dataIndex: 'img',
    //   render: (img) => <PatientImg img={img} />
    // },
    {
      title: "Name",
      dataIndex: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value);
      },
    },
    {
      key: '_id',
      dataIndex: '_id',
      title: 'ID',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a._id - b._id,
      render: (_id) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          KD2022#{_id}
        </span>
      )
    },
    {
      key: 'address',
      dataIndex: ['house_no','street','city','state','pincode'],
      title: 'Address',
      render: (text,row) => <span style={{ minWidth: 200, display: 'block' }}>{row["house_no"]}, {row["street"]}, {row["city"]}, {row["state"]},{row["pincode"]}</span> ,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.city.toLowerCase().includes(value);
      },
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
    {
      key: 'email',
      dataIndex: 'email',
      title: ' Email address',
      render: (email) => (
        <span className='nowrap'>
          {email}
        </span>
      )
    },
    {
      key: 'birthDate',
      dataIndex: 'birthDate',
      title: ' Birthdate',
      render: (birthDate) => (
        <span className='nowrap'>
          {birthDate}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: actions
    }
  ];
 
  const pagination = patients.length <= 10 ? false : {};
  return (
    <>
      <Table
        pagination={pagination}
        className='accent-header'
        rowKey='_id'
        dataSource={patients}
        columns={columns}
      />

      <Modal
        visible={visibility}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        title={<h3 className='title'>Edit patient</h3>}
      >
        <PatientForm
          submitText='Update patient'
          onCancel={closeModal}
          onSubmit={onEditPatient}
          patient={patient}
        />
      </Modal>
    </>
  );
};

export default PatientsTable;
