import React, { Fragment, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeAuth } from '../store/auth.store';

const Dashboard = () => {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    credentials: 'include',
  };

  const navigate = useNavigate();

  const userDetails = JSON.parse(Cookies.get('user'));

  const authDispatcher = useDispatch();

  const handleLogout = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/admin/logoutAdmin`,
        options
      );
    } catch (err) {
      console.log(err.response.data);
    }

    authDispatcher(removeAuth());
    Cookies.remove('user');
    Cookies.remove('auth');

    navigate('/login', { replace: true });
  };

  return (
    <Fragment>
      {/* <div>Dashboard</div> */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/dashboard/stocks">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard/stocks">Stocks</Nav.Link>
            <Nav.Link href="/dashboard/createstock">Add Stock</Nav.Link>
            <Nav.Link href="/dashboard/bills">Bills</Nav.Link>
          </Nav>

          <Nav>
            <Navbar.Text>Welcome, {userDetails.name}</Navbar.Text>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default Dashboard;
