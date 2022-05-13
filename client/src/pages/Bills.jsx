import React, { Fragment, useEffect, useState } from 'react';
import { Table, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import { fDate } from '../utils/formatTime';

const Bills = () => {
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

  const [billData, setBillData] = useState([]);

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/admin/getPaymentsRecieved',
          options
        );

        // console.log(data);
        let reqData = data.data.mainData;
        setBillData(reqData);

        setToastMsg(data.message);
        setToastColor('success');
        setShowToast(true);
        await sleep(2000);
      } catch (err) {
        setToastMsg(err?.response?.data?.error || 'Some error occurred!');
        setToastColor('warning');
        setShowToast(true);
        await sleep(2000);
      }
      setShowToast(false);
    };

    fetchBillData().then();
  }, []);

  return (
    <Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>PaymentMode</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {billData.map((ele, index) => {
            console.log(ele.paymentDate);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.category.name}</td>
                <td>{ele.amount}</td>
                <td>{ele.quantity}</td>
                <td>{ele.paymentMode}</td>
                <td>{fDate(ele.paymentDate)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

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

export default Bills;
