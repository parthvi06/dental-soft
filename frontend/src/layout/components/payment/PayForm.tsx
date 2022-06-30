import React from 'react';

import { Button, Select, Input, DatePicker } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import { hasErrorFactory } from '../../../utils/hasError';

import { IBilling } from '../../../interfaces/patient';
import { textChangeRangeNewSpan } from 'typescript';

const { TextArea } = Input;
type Props = {
  onSubmit: (payment: IBilling) => void;
  onCancel: () => void;
  payment?: IBilling;
  submitText?: string;
};

const defaultSubmitText = 'Add Payment';
const emptyPayment = {
  patient: null,
  doctor: null,
  billNo: null,
  billDate: null,
  discount: null,
  charges: null,
  tax: null,
  total: null
};

const paymentScheme = Yup.object({
  patient: Yup.string().required('patient Required').nullable(),
  doctor: Yup.string().required('doctor Required').nullable(),
  billNo: Yup.string().required(),
  billDate: Yup.string().required(),
  discount: Yup.string().required(),
  charges: Yup.string().required(),
  tax: Yup.string().required(),
  total: Yup.string().required()
});

const PayForm = ({
  submitText = defaultSubmitText,
  payment = emptyPayment,
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
  } = useFormik<IBilling>({
    validationSchema: paymentScheme,
    initialValues: payment,
    onSubmit: (values) => {
      onSubmit(values);
      onCancel();
    }
  });

  const hasError = hasErrorFactory(touched, errors);

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

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
            defaultValue={values.tax}
            className={hasError('tax')}
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
            name='Tax'
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

          <Button type='primary' htmlType='submit'>
            {submitText}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PayForm;