import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Overlay from "../Overlay";

export default function QtsPayPal() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [amount, setAmount] = useState("25.00");

  return (
    <>
      <Button className = "donate-to-qts-btn" variant="primary" onClick={() => setShowOverlay(true)}>
        💙 Donate to Quartzion 💙
      </Button>

      {showOverlay && (
        <Overlay className="card-overlay-bg" onClose={() => setShowOverlay(false)}>
          <div className="paypal-bg">
                        <Form.Group controlId="donationAmount" style={{ marginBottom: "1rem" }}>
              <Form.Label>Donation Amount (USD)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{ maxWidth: "200px" }}
              />
            </Form.Group>
            <PayPalButtons
              style={{ layout: "vertical", color: "gold", shape: "rect", label: "donate" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount || "25.00",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(`Donation completed by ${details.payer.name.given_name}!`);
                  setShowOverlay(false);
                });
              }}
            />
            <br />
            <Button
              className="close-donate-window-btn"
              variant="secondary"
              onClick={() => setShowOverlay(false)}
              aria-label="Close PayPal overlay"
            >
              Close Donation Window
            </Button>
          </div>
        </Overlay>
      )}
    </>
  );
}