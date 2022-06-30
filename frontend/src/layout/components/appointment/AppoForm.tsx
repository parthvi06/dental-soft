import React from 'react';

import { Button, Select, Input, DatePicker } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import ImageLoader from './ImageLoader';
import { hasErrorFactory } from '../../../utils/hasError';

import { IAppointment } from '../../../interfaces/patient';

const { TextArea } = Input;
type Props = {
  onSubmit: (appointment: IAppointment) => void;
  onCancel: () => void;
  appointment?: IAppointment;
  submitText?: string;
};

const defaultSubmitText = 'Add appointment';
const emptyAppointment = {
  title: null,
  number: null,
  img: null,
  email: null,
};

const appointmentScheme = Yup.object({
  title: Yup.string().required('Name Required').nullable(),
  number: Yup.string().required(),
  img: Yup.string().required(),
  email: Yup.string().email('Invalid email').required('Email Required').nullable(),
});

const AppoForm = ({
  submitText = defaultSubmitText,
  appointment = emptyAppointment,
  onSubmit,
  onCancel
}: Props) => {
  const {
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleSubmit,
    setValues,
    handleBlur,
    resetForm,
    touched,
    values,
    errors,
    isValid
  } = useFormik<IAppointment>({
    validationSchema: appointmentScheme,
    initialValues: appointment,
    onSubmit: (form) => {
      onSubmit({ ...form, start: `${form.date}T${form.from}` ,fromTo: `${form.from} - ${form.to}` });
      onCancel();
    }
  });

  const hasError = hasErrorFactory(touched, errors);

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleImageLoad = (img) => {
    setValues({ ...values, img });
  };  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <ImageLoader onLoad={handleImageLoad} src={values.img as string} />
        </div>

        <div className='form-group'>
          <Input
            name='title'
            placeholder='Name'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.title}
            className={hasError('title')}
          />
        </div>

        <div className='form-group'>
          <Input
            defaultValue={values.doctor}
            placeholder='Doctor'
            onBlur={handleBlur}
            name='doctor'
            onChange={handleChange}
            className={hasError('doctor')}
          />
        </div>

        <div className='form-group'>
          <Input
            defaultValue={values.email}
            placeholder='Email'
            name='email'
            type='email'
            onBlur={handleBlur}
            onChange={handleChange}
            className={hasError('email')}
          />
        </div>

        <div className='form-group'>
        <Input
            defaultValue={values.date}
            placeholder='Date::YYYY-MM-DD'
            name='date'
            onChange={handleChange}
            onBlur={handleBlur}
            className={hasError('date')}
          />
        </div>

        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <div className='form-group'>
              <Input
                name='from'
                placeholder='From'
                defaultValue={values.from}
                onChange={handleChange}
                onBlur={handleBlur}
                className={hasError('from')}
              />
            </div>
          </div>

          <div className='col-sm-12 col-md-6'>
            <div className='form-group'>
              <Input
                name='to'
                placeholder='To'
                defaultValue={values.to}
                onChange={handleChange}
                onBlur={handleBlur}
                className={hasError('to')}
              />
            </div>
          </div>
        </div>

        <div className='form-group'>
          <Input
            type='phone'
            name='number'
            onBlur={handleBlur}
            placeholder='Number'
            onChange={handleChange}
            defaultValue={values.number}
            className={hasError('number')}
          />
        </div>

        <div className='form-group'>
          <Input
            name='injury'
            placeholder='Injury'
            onChange={handleChange}
            defaultValue={values.injury}
            onBlur={handleBlur}
            className={hasError('injury')}
          />
        </div>
        <div className='d-flex justify-content-between buttons-list settings-actions'>
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>

          <Button type='primary' htmlType='submit'>
            {submitText}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AppoForm;