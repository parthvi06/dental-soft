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
  doctor: Yup.string().required(),
  email: Yup.string().required(),
  injury: Yup.string().required(),
  title: Yup.string().required(),
  number: Yup.string().required(),
  from: Yup.string().required(),
  to: Yup.string().required()
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
      onSubmit({ ...form, start: `${form.date}T${form.from}`,fromTo: `${form.from} - ${form.to}` });
      onCancel();
    }
  });
  const [date, from] = values.start.split('T');
  const [img, setImg] = useState(values.img);

  useEffect(() => {
    setValues({ ...values, date, from });
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

          <Button disabled={!isValid} type='primary' htmlType='submit'>
            {submitText}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AppointmentForm;
