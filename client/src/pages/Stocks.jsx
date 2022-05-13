import React, { Fragment, useEffect, useState } from 'react';
import {
  Table,
  Toast,
  ToastContainer,
  Modal,
  Button,
  Form as BForm,
} from 'react-bootstrap';
import axios from 'axios';
import StocksCard from '../components/StocksCard';
import * as Yup from 'yup';
import { Formik, useFormik, Field, Form, ErrorMessage } from 'formik';

const Stocks = () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const options = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    credentials: 'include',
  };

  const [dataChanged, setDataChanged] = useState(true);

  // Toast

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastColor, setToastColor] = useState('secondary');

  // ------------------------

  // Selling Stock Modal

  const SellSchema = Yup.object().shape({
    stockId: Yup.string(),
    name: Yup.string(),
    amount: Yup.number().required('Amount is required'),
    quantity: Yup.number().required('Quantity is required'),
    paymentMode: Yup.string()
      .min(3, 'Too short!')
      .max(10, 'Too long!')
      .required('Payment Mode is required!'),
    transactionId: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required(),
    customerName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(),
    address: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
    phoneNo: Yup.string()
      .min(8, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Phone No required'),
  });

  // ------------------------

  // Modal

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ----------------------------

  const [formikValue, setFormikValue] = useState();

  const [sharedNameState, setSharedNameState] = useState('');

  const [sharedStockId, setSharedStockId] = useState('');

  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/admin/getAllStocks',
          options
        );

        // console.log(data);
        setStockData(data.data);
      } catch (err) {
        setToastMsg(err?.response?.data?.error);
        setToastColor('warning');
        setShowToast(true);
        await sleep(2000);
      }
    };

    fetchBillData().then();
    setShowToast(false);
  }, [dataChanged]);

  return (
    <Fragment>
      {stockData.map((ele, index) => {
        // console.log(ele);
        // return 'Sourav';
        return (
          <StocksCard
            key={ele.stockId}
            mkey={ele.stockId}
            stockData={ele}
            setShow={setShow}
            handleClose={handleClose}
            handleShow={handleShow}
            setSharedNameState={setSharedNameState}
            setSharedStockId={setSharedStockId}
          />
        );
      })}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sell Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              stockId: '',
              name: '',
              amount: '',
              quantity: '',
              paymentMode: '',
              transactionId: '',
              customerName: '',
              address: '',
              phoneNo: '',
            }}
            validationSchema={SellSchema}
            onSubmit={async (values) => {
              values.stockId = sharedStockId;
              values.name = sharedNameState;
              // alert(JSON.stringify(values, null, 2));

              try {
                const { data } = await axios.put(
                  'http://localhost:5000/api/admin/sellStock',
                  {
                    data: {
                      stockId: values.stockId,
                      amount: values.amount,
                      quantity: values.quantity,
                      paymentMode: values.paymentMode,
                      transactionId: values.transactionId,
                      customer: {
                        name: values.customerName,
                        address: values.address,
                        phoneNo: values.phoneNo,
                      },
                    },
                  },
                  options
                );

                handleClose();

                setToastMsg(data?.message);
                setToastColor('success');
                setShowToast(true);
                await sleep(2000);

                setDataChanged((prev) => !prev);
                // navigate('/dashboard/stocks', { replace: true });
              } catch (err) {
                // console.log(err?.response?.data?.error);

                handleClose();

                setToastMsg(err?.response?.data?.error);
                setToastColor('warning');
                setShowToast(true);
                await sleep(2000);
              }

              setShowToast(false);
            }}
            // 2022-05-12T19:45:31.360Z
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form>
                <label htmlFor="name">Name</label>
                <Field
                  disabled
                  name="name"
                  placeholder="John Doe"
                  value={sharedNameState}
                />
                <ErrorMessage name="name" render={(msg) => <div>{msg}</div>} />

                <br />

                <label htmlFor="stockId">StockId</label>
                <Field
                  disabled
                  name="stockId"
                  placeholder="Stock Id"
                  value={sharedStockId}
                />
                <ErrorMessage
                  name="stockId"
                  render={(msg) => <div>{msg}</div>}
                />

                <br />

                <label htmlFor="amount">Amount</label>
                <Field name="amount" placeholder="0" type="number" />
                <ErrorMessage
                  name="amount"
                  render={(msg) => <div>{msg}</div>}
                />

                <br />

                <label htmlFor="quantity">Quantity</label>
                <Field name="quantity" placeholder="0" type="number" />
                <ErrorMessage
                  name="quantity"
                  render={(msg) => <div>{msg}</div>}
                />

                <br />

                <h5>Customer Details</h5>

                <br />

                <label htmlFor="customerName">Customer Name</label>
                <Field name="customerName" placeholder="Customer Name" />
                <ErrorMessage
                  name="customerName"
                  render={(msg) => <div>{msg}</div>}
                />

                <br />

                <label htmlFor="address">Address</label>
                <Field name="address" placeholder="Address" />
                <ErrorMessage
                  name="address"
                  render={(msg) => <div>{msg}</div>}
                />

                <br />

                <label htmlFor="phoneNo">PhoneNo</label>
                <Field name="phoneNo" placeholder="Phone No" />
                <ErrorMessage
                  name="phoneNo"
                  render={(msg) => <div>{msg}</div>}
                />

                <br />
                <label htmlFor="paymentMode">Payment Mode</label>
                <Field name="paymentMode" placeholder="Mode" />
                <ErrorMessage
                  name="paymentMode"
                  render={(msg) => <div>{msg}</div>}
                />

                <br />
                <label htmlFor="transactionId">Transaction Id</label>
                <Field name="transactionId" placeholder="Transaction Id" />
                <ErrorMessage
                  name="transactionId"
                  render={(msg) => <div>{msg}</div>}
                />

                <br />

                <Button type="submit" disabled={isSubmitting}>
                  Sell Stock
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

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

export default Stocks;
