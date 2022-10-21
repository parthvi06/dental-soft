import React, { useEffect, useState } from 'react';
import { getPatient } from '../../../redux/patients/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchPageData } from '../../../hooks/usePage';
import { IPatient } from '../../../interfaces/patient';
import { Avatar, Table, Button, Tabs, Input } from 'antd';
import { Card, Form, Select, Timeline } from 'antd'
import { useFormik } from 'formik';
import ImageLoader from '../../../layout/components/patients/ImageLoader';

const PatientDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();
  useEffect(() => {
    dispatch(getPatient(id['id']));
  }, [id]);
  const [patient] = useFetchPageData<IPatient[]>(`http://localhost:7000/patients/${id['id']}`, []);
  const FormItem = Form.Item;
  const Option = Select.Option;

  const ProfileForm = ({ patient }) => {
    const { values } = useFormik({
      initialValues: { ...patient },
      onSubmit: () => null
    });
  
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
 
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
   
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { firstName: "", lastName: "" }]);
      console.log(inputList)
    };
  return (
    <div className='patient-info'>
      <h5>{patient.name}</h5>
      <Tabs>
        <Tabs.TabPane tab="Clinical Note" key="Clinical_Note">
          <Form>
          {inputList.map((x, i) => {
        return (
          <div className="box" style={{display:'inline-flex'}}>
            <input
              name="firstName"
   placeholder="Enter First Name"
              value={x.firstName} 
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="lastName"
   placeholder="Enter Last Name"
              value={x.lastName}
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
          <div><p>{JSON.stringify(inputList)}</p></div>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
  };

  return (
      patient && (
        <>
          <div className='row mb-4'>
            <div className='col-md-6 col-sm-12'>
              <div className='header mb-3'> 
              </div>
              <div className='info stack'>
                <ProfileForm patient={patient} />
                <Button type='primary'>Save Changes</Button>
              </div>
            </div>
          </div>
          
        </>
      )
  );
};

export default PatientDetails