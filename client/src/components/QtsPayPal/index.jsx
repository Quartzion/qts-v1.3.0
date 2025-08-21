import { PayPalButtons } from "@paypal/react-paypal-js";

export default function QtsPayPal() {
  return (
    <div style={{ maxWidth: "300px", margin: "2rem auto" }}>
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "rect", label: "donate" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // test donation amount
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Donation completed by ${details.payer.name.given_name}!`);
          });
        }}
      />
    </div>
  );
}