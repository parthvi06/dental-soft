import React, { useEffect, useState } from 'react';

import { Button, Input } from 'antd';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import ImageLoader from '../../../layout/components/patients/ImageLoader';
import { hasErrorFactory } from '../../../utils/hasError';

import { IAppointment } from '../../../interfaces/patient';

type Props = {
  appointment?: IAppointment;
  onSubmit: (appointment: IAppointment) => void;
  onCancel: () => void;
  submitText?: string;
};

const defaultSubmitText = 'Add Appointment';
const emptyAppointment = {
  start: '',
  doctor: '',
  email: '',
  fromTo: '',
  img: '',
  injury: '',
  title: '',
  number: '',
  from: '',
  to: '',
  date:''
};

const appointmentSchema = Yup.object().shape({
  // start: Yup.string().required(),
  // doctor: Yup.string().required(),
  // email: Yup.string().required(),
  // injury: Yup.string().required(),
  // title: Yup.string().required(),
  // number: Yup.string().required(),
  // from: Yup.string().required(),
  // to: Yup.string().required()
});

const AppointmentForm = ({
  submitText = defaultSubmitText,
  appointment = emptyAppointment,
  onSubmit,
  onCancel
}: Props) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setValues,
    isValid,
    errors,
    touched,
    resetForm
  } = useFormik<IAppointment>({
    validationSchema: appointmentSchema,
    initialValues: appointment,
    onSubmit: (form) => {
      onSubmit({ ...form });
      onCancel();
    }
  });
  useEffect(() => {
    setValues({ ...values });
  }, [appointment]);


  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const hasError = hasErrorFactory(touched, errors);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <Input
            name='title'
            placeholder='Name'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.title}
            className='title'
          />
        </div>

        <div className='d-flex justify-content-between buttons-list settings-actions'>
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>

          <Button disabled={!isValid} type='primary' className='submit-app' htmlType='submit'>
            {submitText}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AppointmentForm;
