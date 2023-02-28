import React, { useEffect } from 'react';
import { getPatient } from '../../../redux/patients/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchPageData } from '../../../hooks/usePage';
import { IPatient } from '../../../interfaces/patient';
import { Avatar, Table, Button, Tabs, Input, Checkbox, Col, Row ,Divider } from 'antd';
import { Card, Form, Select, Timeline } from 'antd'
import { useFormik } from 'formik';
import ImageLoader from '../../../layout/components/patients/ImageLoader';

import DynamicField from "./DynamicField";
import "antd/dist/antd.css";
import { valueScaleCorrection } from 'framer-motion/types/render/dom/projection/scale-correction';

const { TabPane } = Tabs;
const onChange = (key) => {
};
const PatientDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();
  useEffect(() => {
    dispatch(getPatient(id['id']));
  }, [id]);
  const [patient] = useFetchPageData<IPatient[]>(`http://localhost:7000/patients/${id['id']}`, []);
  console.log(patient);
  const FormItem = Form.Item;
  const Option = Select.Option;

  const ProfileForm = ({ patient }) => {
    const { values } = useFormik({
      initialValues: { ...patient },
      onSubmit: () => null
    });
    const [form] = Form.useForm();

    function handleFinish(values) {
      console.log("VALUES", values);
      console.log(JSON.stringify(values))
    }
    const defaultFormItemLayout = {
      labelCol: {
        xs: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 12 }
      }
    };
  return (
    <div className='patient_file'>
      <div className="App">
      <h1>AntD Dynamic Form Example</h1>
      <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
        <Form.Item
          name="first"
          initialValue={values.name}
          label="Persistent Field"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Divider dashed>Additional Fields</Divider>
        <DynamicField />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
   </div> 

  );
};

    return (
      patient && (
        <>
          
          <div className='row mb-4'>
              <div className='info stack'>
                <ProfileForm patient={patient} />
                {/* <Button type='primary'>Save Changes</Button> */}
              </div>
          </div>
        </>
      )
    );
  };

export default PatientDetails