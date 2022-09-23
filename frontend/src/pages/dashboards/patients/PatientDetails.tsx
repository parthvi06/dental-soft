import React, { useEffect, useState } from 'react';
import { getPatient } from '../../../redux/patients/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { IAppState } from '../../../interfaces/app-state';
import { IPatient } from '../../../interfaces/patient';
import { Avatar, Table, Button, Modal, Tag, Input } from 'antd';
import { usePatients } from '../../../hooks/usePatients';
import PatientInfo from './PatientInfo';
import * as actions from '../../../redux/patients/actions';
import { fetchPatient } from '../../../api';

const PatientDetails = () => {
    const dispatch = useDispatch();
    // const patient = useSelector<IAppState, IPatient[]>((state) => state.patients);
    // const history = useHistory();
    const id = useParams();
    // console.log(id['id'])
    useEffect(() => {
      dispatch(getPatient(id['id']));
    }, [id]);
    // const patientInfo = (patient: IPatient) => {
    //   return dispatch(actions.getPatient(patient));
    // };

    // const { patients, editPatient, deletePatient, patientInfo } = usePatients();
    return (
        <div>
            <h2>{id['id']}</h2>
            <h2>{}</h2>
      </div>
    );
  };

export default PatientDetails