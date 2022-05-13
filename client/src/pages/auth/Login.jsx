import React, { Fragment, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../store/auth.store';
import { addUser } from '../../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, Toast } from 'react-bootstrap';
import Cookies from 'js-cookie';

const Login = () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const options = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    credentials: 'include',
  };

  // Toast

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastColor, setToastColor] = useState('secondary');

  // ------------------------

  const navigate = useNavigate();

  const userDispatcher = useDispatch();

  const authDispatcher = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required').min(8),
  });

  useEffect(() => {
    const user = Cookies.get('user');

    if (user) {
      navigate('/dashboard/stocks', { replace: true });
    }
  }, []);

  return (
    <Fragment>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          try {
            const { data } = await axios.post(
              'http://localhost:5000/api/admin/loginAdmin',
              {
                data: {
                  email: values.email,
                  password: values.password,
                },
              },
              options
            );

            authDispatcher(addAuth(true));
            userDispatcher(addUser(data.adminDetails));

            Cookies.set('user', JSON.stringify(data.adminDetails));

            setToastMsg('Admin logged in successfully!!');
            setToastColor('success');
            setShowToast(true);
            await sleep(2000);

            navigate('/dashboard/stocks', { replace: true });
          } catch (err) {
            console.log(err?.response?.data?.error);

            setToastMsg(err?.response?.data?.error);
            setToastColor('warning');
            setShowToast(true);
            await sleep(2000);
          }

          setShowToast(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field name="email" placeholder="example@emal.com" />
            <ErrorMessage name="email" render={(msg) => <div>{msg}</div>} />

            <br />

            <label htmlFor="password">Password</label>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" render={(msg) => <div>{msg}</div>} />

            <br />
            <br />

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>

      <ToastContainer className="p-3" position={'bottom-end'}>
        <Toast show={showToast} bg={toastColor}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Info</strong>
          </Toast.Header>
          <Toast.Body className={true && 'text-white'}>{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Fragment>
  );
};

export default Login;
