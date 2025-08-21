import { useState } from "react";
import { Button } from "react-bootstrap";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Overlay from "../Overlay";

export default function QtsPayPal() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <Button className = "donate-to-qts-btn" variant="primary" onClick={() => setShowOverlay(true)}>
        Donate to Quartzion
      </Button>

      {showOverlay && (
        <Overlay className="card-overlay-bg" onClose={() => setShowOverlay(false)}>
          <div className="paypal-bg">
            <PayPalButtons
              style={{ layout: "vertical", color: "gold", shape: "rect", label: "donate" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "25.00",
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