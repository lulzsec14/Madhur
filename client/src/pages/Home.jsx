import React, { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login', { replace: true });
  }, []);

  return (
    <Fragment>
      <div>Home</div>
      <Outlet />
    </Fragment>
  );
};

export default Home;
