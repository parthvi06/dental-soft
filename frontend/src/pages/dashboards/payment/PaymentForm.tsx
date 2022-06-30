import React, { useEffect, useState } from 'react';

import { Button, Input } from 'antd';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { hasErrorFactory } from '../../../utils/hasError';

import { IBilling } from '../../../interfaces/patient';

type Props = {
  payment?: IBilling;
  onSubmit: (payment: IBilling) => void;
  onCancel: () => void;
  submitText?: string;
};

const defaultSubmitText = 'Add Payment';
const emptyPayment = {
  billNo: null,
  patient: null,
  doctor: null,
  billDate: null,
  charges: null,
  discount: null,
  tax: null,
  total: null
};

const paymentSchema = Yup.object().shape({
  billNo: Yup.string().required(),
  patient: Yup.string().required(),
  doctor: Yup.string().required(),
  billDate: Yup.string().required(),
  charges: Yup.string().required(),
  discount: Yup.string().required(),
  tax: Yup.string().required(),
  total: Yup.string().required()
});

const PaymentForm = ({
  submitText = defaultSubmitText,
  payment = emptyPayment,
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
  } = useFormik<IBilling>({
    validationSchema: paymentSchema,
    initialValues: payment,
    onSubmit: (form) => {
      onSubmit(form);
      onCancel();
    }
  });

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
            type='text'
            name='billNo'
            onBlur={handleBlur}
            placeholder='Bill_No'
            onChange={handleChange}
            defaultValue={values.billNo}
            className={hasError('billNo')}
          />
        </div>

        <div className='form-group'>
          <Input
            name='patient'
            placeholder='Patient'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.patient}
            className={hasError('patient')}
          />
          {errors.patient && touched.patient ? (
            <div>{errors.patient}</div>
          ) : null}
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
            defaultValue={values.billDate}
            placeholder='Bill_Date'
            name='billDate'
            onChange={handleChange}
            onBlur={handleBlur}
            className={hasError('billDate')}
          />
        </div>

        <div className='form-group'>
          <Input
            type='number'
            name='charges'
            onBlur={handleBlur}
            placeholder='Charges'
            onChange={handleChange}
            defaultValue={values.charges}
            className={hasError('charges')}
          />
        </div>

        <div className='form-group'>
          <Input
            type='number'
            name='tax'
            onBlur={handleBlur}
            placeholder='Tax'
            onChange={handleChange}
            defaultValue={values.discount}
            className={hasError('discount')}
          />
        </div>
        
        <div className='form-group'>
          <Input
            type='number'
            name='discount'
            onBlur={handleBlur}
            placeholder='Discount'
            onChange={handleChange}
            defaultValue={values.discount}
            className={hasError('discount')}
          />
        </div>

        <div className='form-group'>
          <Input
            type='number'
            name='total'
            onBlur={handleBlur}
            placeholder='Total'
            onChange={handleChange}
            defaultValue={values.total}
            className={hasError('total')}
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

export default PaymentForm;
