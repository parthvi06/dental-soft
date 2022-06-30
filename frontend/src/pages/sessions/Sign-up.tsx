import React, { useState } from 'react';

import { Form, Input } from 'antd';

import PublicLayout from '../../layout/public/Public';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { useNavigateHome } from '../../utils/use-navigate-home';
import UserPool from '../../UserPool';
const { Item } = Form;

const SignUp = () => {
  // const navigateHome = useNavigateHome();
  // const [form] = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    });
  };

  return (
    <PublicLayout bgImg={`${window.origin}/content/register-page.jpg`}>
      <h4 className='mt-0 mb-1'>Sign up</h4>
      <p className='text-color-200'>Create your Account</p>

      <form onSubmit={onSubmit} className='mb-5'>
        {/* <Item name='name' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Name' />
        </Item> */}

        <Item
          name='email'
          rules={[
            { required: true, message: <></> },
            { type: 'email', message: <></> }
          ]}
        >
          <Input placeholder='Email address' 
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type='mail' />
        </Item>

        <Item name='password' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Password' 
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type='password' />
        </Item>

        {/* <div className='d-flex align-items-center mb-4'>
          <Switch defaultChecked /> <span className='ml-2'>I agree to the Terms and Privacy.</span>
        </div> */}

        <button> Register</button>
      </form>

      <p>
        Have an account? <Link to='sign-in'>Sign in!</Link>
      </p>
    </PublicLayout>
  );
};

export default SignUp;
