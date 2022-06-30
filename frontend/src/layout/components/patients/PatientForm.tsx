import React from 'react';

import { Button, Select, Input, DatePicker } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import ImageLoader from './ImageLoader';
import { hasErrorFactory } from '../../../utils/hasError';

import { IPatient } from '../../../interfaces/patient';

const { TextArea } = Input;
type Props = {
  onSubmit: (patient: IPatient) => void;
  onCancel: () => void;
  patient?: IPatient;
  submitText?: string;
};

const defaultSubmitText = 'Add patient';
const emptyPatient = {
  id: null,
  name: null,
  street: null,
  city: null,
  state: null,
  pincode: null,
  number: null,
  gender: null,
  img: null,
  email: null,
  birthDate: null
};

const patientScheme = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required('Name Required').nullable(),
  street: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  pincode: Yup.string().required(),
  number: Yup.string().required(),
  gender: Yup.string().required(),
  img: Yup.string().required(),
  birthDate: Yup.string().required(),
  email: Yup.string().email('Invalid email').required('Email Required').nullable(),
});

const PatientForm = ({
  submitText = defaultSubmitText,
  patient = emptyPatient,
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
  } = useFormik<IPatient>({
    validationSchema: patientScheme,
    initialValues: patient,
    onSubmit: (values) => {
      onSubmit(values);
      onCancel();
    }
  });

  const handleGenderSelect = (value) => setFieldValue('gender', value);

  const hasError = hasErrorFactory(touched, errors);

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const handleImageLoad = (img) => {
    setValues({ ...values, img });
  };  
  const handleChangedate = (date, birthDate) => {
    setValues({ ...values, birthDate });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <ImageLoader onLoad={handleImageLoad} src={values.img as string} />
        </div>

        <div className='form-group'>
          <Input
            placeholder='Patient ID'
            name='id'
            type='text'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.id}
            className={hasError('id')}
          />
        </div>
        <div className='form-group'>
          <Input
            placeholder='Name'
            name='name'
            type='text'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.name}
            className={hasError('name')}
          />
          {errors.name && touched.name ? (
            <div>{errors.name}</div>
          ) : null}
        </div>

        <div className='form-group'>
          <Input
            placeholder='Street'
            name='street'
            type='text'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.street}
            className={hasError('street')}
          />
        </div>

        <div className='row'>
          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <Input
                placeholder='City'
                name='city'
                type='text'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.city}
                className={hasError('city')}
              />
            </div>
          </div>

          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <Input
                placeholder='State'
                name='state'
                type='text'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.state}
                className={hasError('state')}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <Input
                placeholder='Pincode'
                name='pincode'
                type='text'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.pincode}
                className={hasError('pincode')}
              />
            </div>
          </div>

          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <Input
                placeholder='Phone'
                name='number'
                type='phone'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.number}
                className={hasError('number')}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <DatePicker name="birtDate" 
                placeholder='Birthdate'
                onChange={handleChangedate}
                onBlur={handleBlur}
                defaultValue={values.birthDate ? moment(values.birthDate) : null }
                className={hasError('birthDate')}
              />
            </div>
          </div>

          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <Select
                placeholder='Gender'
                defaultValue={values.gender}
                onChange={handleGenderSelect}
                className={hasError('gender')}
                onBlur={() => setFieldTouched('gender')}
              >
                <Select.Option value='Male'>Male</Select.Option>
                <Select.Option value='Female'>Female</Select.Option>
              </Select>
            </div>
          </div>
        </div>

        <div className='form-group'>
        <Input
            placeholder='Email'
            name='email'
            type='email'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.email}
            className={hasError('email')}
          />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
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

export default PatientForm;