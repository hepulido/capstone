import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  padding: 8px;
  margin: 8px;
  width: 200px;
  border: 1px solid #00c3ff;;
  border-radius: 4px;
`;

const Button = styled.button`
  color: white;
  background: #00c3ff;
  font-weight: 500;
  font-size: 1em;
  margin: 1em 0.25em;
  padding: 0.25em 1em;
  border: 2px solid #00c3ff;
  border-radius: 3px;
  cursor: pointer;
`;

export function CheckoutForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/paymentcomplete")
    console.log("Card Number:", cardNumber);
    console.log("Card Name:", cardName);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <label>
            Card Number:
            <Input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
            />
          </label>
          <label>
            Cardholder Name:
            <Input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
            />
          </label>
          <label>
            Expiry Date:
            <Input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
          </label>
          <label>
            CVV:
            <Input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
            />
          </label>
          <Button type="submit">Submit Payment</Button>
        </Form>
      </Container>
    </>
  );
}
