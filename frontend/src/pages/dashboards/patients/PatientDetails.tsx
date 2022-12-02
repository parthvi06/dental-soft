import React, { useEffect, useState } from 'react';
import { getPatient } from '../../../redux/patients/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchPageData } from '../../../hooks/usePage';
import { IPatient } from '../../../interfaces/patient';
import { Avatar, Table, Button, Tabs, Input } from 'antd';
import { Card, Select, Timeline } from 'antd'
import { useFormik } from 'formik';
import ImageLoader from '../../../layout/components/patients/ImageLoader';
import { addPatient, editPatient } from '../../../redux/patients/actions';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const PatientDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();
  useEffect(() => {
    dispatch(getPatient(id['id']));
  }, [id]);
  const [patient] = useFetchPageData<IPatient[]>(`http://localhost:7000/patients/${id['id']}`, []);


  
  const initialValues = {
    friends: [
      {
        name: '',
        email: '',
      },
    ],
  };
  return (
      patient && (
        <>
          {/* <div>
            <h1>Invite friends</h1>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
                alert(values)
              }}
            >
              {({ values }) => (
                <Form>
                  <FieldArray name="friends">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.friends.length > 0 &&
                          values.friends.map((friend, index) => (
                            <div className="row" key={index}>
                              <div className="col">
                                <label htmlFor={`friends.${index}.name`}>Name</label>
                                <Field
                                  name={`friends.${index}.name`}
                                  placeholder="Jane Doe"
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`friends.${index}.name`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className="col">
                                <label htmlFor={`friends.${index}.email`}>Email</label>
                                <Field
                                  name={`friends.${index}.email`}
                                  placeholder="jane@acme.com"
                                  type="email"
                                />
                                <ErrorMessage
                                  name={`friends.${index}.name`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className="col">
                                <button
                                  type="button"
                                  className="secondary"
                                  onClick={() => remove(index)}
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          ))}
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => push({ name: '', email: '' })}
                        >
                          Add Friend
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  <button type="submit">Invite</button>
                </Form>
              )}
            </Formik>
          </div> */}
          <div className='row mb-4'>
            <div className='col-md-6 col-sm-12'>
              <div className='header mb-3'> 
              </div>
              {/* <div className='info stack'>
                <ProfileForm patient={patient} />
                <Button type='primary'>Save Changes</Button>
              </div> */}
            </div>
          </div>
          
        </>
      )
  );
};

export default PatientDetails