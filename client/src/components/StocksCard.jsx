import React, { Fragment, useState } from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { fDate } from '../utils/formatTime';

const StocksCard = ({
  // key,
  mkey,
  setSharedNameState,
  setSharedStockId,
  stockData,
  setShow,
  handleClose,
  handleShow,
}) => {
  const handleSell = () => {
    setShow(true);
    setSharedNameState(stockData.name);
    setSharedStockId(stockData.stockId);
  };

  const currDate = fDate(stockData?.datePurchased);

  return (
    <Fragment>
      <Card
        className="shadow-1-strong"
        style={{ width: '27rem', borderRadius: '16px' }}
      >
        <Card.Img
          variant="top"
          className="img-fluid bg-image"
          style={{
            borderRadius: '16px',
            padding: '1px',
            height: '200px',
            backgroundSize: 'cover',
          }}
          src="/static/cardCover/default.jpg"
        />
        <Card.Body>
          <Card.Title>{stockData?.name}</Card.Title>
          <Card.Text>{stockData?.category?.name}</Card.Text>
          <Card.Text>{stockData?.seller?.name}</Card.Text>
          <Card.Text>{stockData?.amount}</Card.Text>
          <Card.Text>{stockData?.quantity}</Card.Text>
          <Card.Text>{currDate}</Card.Text>

          <Stack direction="horizontal" gap={2}>
            <Button className="ms-auto" variant="primary" onClick={handleSell}>
              Sell
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default StocksCard;
