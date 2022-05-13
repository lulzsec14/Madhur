import React, { Fragment, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, Toast, Form as BForm } from 'react-bootstrap';

const AddStock = () => {
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

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required').min(8),
  });

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/admin/getAllCats',
          options
        );

        // console.log(response.data.data);
        setCategoryData(response.data.data);
      } catch (err) {
        setToastColor('warning');
        setToastMsg(err?.response?.data?.error);
        setShowToast(true);
        await sleep(2000);
      }
    };

    fetchCats().then();
    setShowToast(false);
  }, []);

  const navigate = useNavigate();

  const stockDetails = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
    amount: Yup.number().positive().required(),
    quantity: Yup.number().positive().required(),
    category: Yup.string().max(20, 'Too Long!').required(),
    sellerName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(),
    address: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
    phoneNo: Yup.string().min(8, 'Too Short!').max(12, 'Too Long!').required(),
    mode: Yup.string().min(2, 'Too Short!').max(12, 'Too Long!').required(),
    transactionId: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required(),
  });

  const catData = ['Gym', 'Furniture', 'Electronics', 'Health'];

  return (
    <Fragment>
      <h1>Create Stock</h1>

      <Formik
        initialValues={{
          name: '',
          amount: '',
          quantity: '',
          category: '',
          sellerName: '',
          address: '',
          phoneNo: '',
          mode: '',
          transactionId: '',
        }}
        validationSchema={stockDetails}
        onSubmit={async (values) => {
          // alert(JSON.stringify(values, null, 2));
          try {
            const { data } = await axios.post(
              'http://localhost:5000/api/admin/createNewStock',
              {
                data: {
                  name: values.name,
                  category: values.category,
                  seller: {
                    name: values.sellerName,
                    address: values.address,
                    phoneNo: values.phoneNo,
                  },
                  amount: values.amount,
                  quantity: values.quantity,
                  paymentMode: values.mode,
                  transactionId: values.transactionId,
                },
              },
              options
            );

            setToastMsg(data.message);
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
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <label htmlFor="name">Name</label>
            <Field name="name" placeholder="John Doe" />
            <ErrorMessage name="name" render={(msg) => <div>{msg}</div>} />

            <br />

            <label htmlFor="amount">Amount</label>
            <Field name="amount" placeholder="0" type="number" />
            <ErrorMessage name="amount" render={(msg) => <div>{msg}</div>} />

            <br />

            <label htmlFor="quantity">Quantity</label>
            <Field name="quantity" placeholder="0" type="number" />
            <ErrorMessage name="quantity" render={(msg) => <div>{msg}</div>} />

            <br />

            <label htmlFor="category">Category</label>
            {/* <Field name="category" placeholder="Category" /> */}
            <BForm.Select
              name="category"
              onChange={(e) => {
                // console.log(e.target.value);
                // console.log(values);
                values.category = e.target.value;
              }}
            >
              {categoryData.map((val) => {
                return (
                  <option key={val.name} value={val.name}>
                    {val.name}
                  </option>
                );
              })}
              {/* <option value="Gym">Gym</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option> */}
            </BForm.Select>
            <ErrorMessage name="category" render={(msg) => <div>{msg}</div>} />

            <br />

            <label htmlFor="sellerName">Seller Name</label>
            <Field name="sellerName" placeholder="Seller Name" />
            <ErrorMessage
              name="sellerName"
              render={(msg) => <div>{msg}</div>}
            />

            <br />

            <label htmlFor="address">Address</label>
            <Field name="address" placeholder="Address" />
            <ErrorMessage name="address" render={(msg) => <div>{msg}</div>} />

            <br />

            <label htmlFor="phoneNo">PhoneNo</label>
            <Field name="phoneNo" placeholder="Phone No" />
            <ErrorMessage name="phoneNo" render={(msg) => <div>{msg}</div>} />

            <br />
            <label htmlFor="mode">Mode</label>
            <Field name="mode" placeholder="Mode" />
            <ErrorMessage name="mode" render={(msg) => <div>{msg}</div>} />

            <br />
            <label htmlFor="transactionId">Transaction Id</label>
            <Field name="transactionId" placeholder="Transaction Id" />
            <ErrorMessage
              name="transactionId"
              render={(msg) => <div>{msg}</div>}
            />

            <br />

            <button type="submit" disabled={isSubmitting}>
              Add Stock
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

export default AddStock;
