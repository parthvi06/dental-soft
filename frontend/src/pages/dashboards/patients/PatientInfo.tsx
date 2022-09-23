import React, { useState } from 'react';
import {IPatient} from '../../../interfaces/patient';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ColumnProps } from 'antd/es/table';
import { Avatar, Table, Button, Modal, Tag, Input } from 'antd'; 
import PatientForm from '../../../layout/components/patients/PatientForm';
type Props = {
    patient: IPatient[];
    onFetchPatient?: (patient: IPatient) => void;
    onEditPatient: (patient: IPatient) => void;
  };
const PatientInfo = ({
    patient,
  
}: Props) => {
    const dispatch = useDispatch();
    // const id = useParams();
    const [patients, setPatient] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const closeModal = () => setVisibility(false)
    const columns: ColumnProps<IPatient>[] = [
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
            key: 'email',
            dataIndex: 'email',
            title: ' Email address',
            render: (email) => (
              <span className='nowrap'>
                {email}
              </span>
            )
          },            
    ];

  return (
    
    <>
    <h2>{patients.id}</h2>
    </>
  )
}

export default PatientInfo