import React, {useState} from 'react';

import { Button, Form, Input, Switch } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';

import PublicLayout from '../../layout/public/Public';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { useNavigateHome } from '../../utils/use-navigate-home';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from '../../UserPool';
import { useHistory } from 'react-router-dom';

const { Item } = Form;

const SignIn = () => {
  const [form] = useForm();
  const navigateHome = useNavigateHome();

  const login = () => {
    form
      .validateFields()
      .then(() => navigateHome())
      .catch(() => null);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        history.push('/vertical/default-dashboard');
        console.log("onSuccess: ", data);
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
        setErrorMessage("Incorrect username or password");
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      },
    });
  };
  return (
    <PublicLayout bgImg={`${window.origin}/content/login-page.jpg`}>
      {errorMessage && <div className="error"> {errorMessage} </div>}
      <p className='text-color-200'>Login to access your Account</p>

      <form onSubmit={onSubmit} className='mb-4'>
      <Item name='email' rules={[{ required: true, message: <></> }, { type: 'email', message: <></> }]} >
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
          <Switch defaultChecked /> <span className='ml-2'>Remember me</span>
        </div> */}

        <button>Login</button>
      </form>
      <br />
      <p className='mb-1'>
        <a href='#'>Forgot password?</a>
      </p>

      <p>
        Don't have an account? <Link to='sign-up'>Sign up!</Link>
      </p>
    </PublicLayout>
  );
};

export default SignIn;
